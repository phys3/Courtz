import { View, Text, Button, Linking } from 'react-native';
import React, { useEffect, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { authorize } from 'react-native-app-auth';
import * as Keychain from 'react-native-keychain';
import ENV from '../../../env';
import { AuthContext } from '../../navigation/AuthNavigator';

const config = {
  issuer: 'https://accounts.google.com',
  clientId: ENV.OAUTH_CLIENT_ID,
  redirectUrl: 'https://phys3.github.io/redirectUrl/',
  scopes: ['openid', 'email', 'profile'],
  usePKCE: false,
};

const EXCHANGE_AUTHORIZATION_CODE = gql`
  mutation ExchangeAuthorizationCode($code: String!) {
    exchangeToken(code: $code) {
      accessToken
      user {
        id
        email
        username
      }
    }
  }
`;

const Authentication = () => {
  const { setIsSignedIn, setToken } = useContext(AuthContext);
  const [exchangeAuthorizationCode] = useMutation(EXCHANGE_AUTHORIZATION_CODE, {
    onCompleted: data => {
      Keychain.setGenericPassword(
        data.exchangeToken.user.id,
        data.exchangeToken.accessToken,
      ).then(() => {
        console.log('datasetIsSignedIn', data.exchangeToken.accessToken);
        setToken(data.exchangeToken.accessToken);
        setIsSignedIn(true);
      });
    },
  });
  useEffect(() => {
    const handleOpenURL = async (event: { url: string }) => {
      const code = event.url
        .split('code=')[1]
        .split('&')[0]
        .replace('%2F', '/');
      if (code) {
        await exchangeAuthorizationCode({
          variables: { code },
        });
      }
    };
    Linking.addEventListener('url', handleOpenURL);

    return () => {
      Linking.removeAllListeners('url');
    };
  }, []);

  const signIn = async () => {
    try {
      await authorize(config);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Text>Authentication</Text>
      <Button title="Sign In with Google" onPress={signIn} />
      {/* {data && <Text>{JSON.stringify(data)}</Text>} */}
    </View>
  );
};

export default Authentication;
