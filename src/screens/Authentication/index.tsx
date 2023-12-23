import { View, Text, Button, Linking } from 'react-native';
import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { authorize } from 'react-native-app-auth';
import { setContext } from '@apollo/client/link/context';
import ENV from '../../../env';

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
  const [exchangeAuthorizationCode] = useMutation(EXCHANGE_AUTHORIZATION_CODE);
  useEffect(() => {
    const handleOpenURL = async event => {
      const code = event.url
        .split('code=')[1]
        .split('&')[0]
        .replace('%2F', '/');
      if (code) {
        const { data } = await exchangeAuthorizationCode({
          variables: { code },
        });

        console.log('data', data);
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
