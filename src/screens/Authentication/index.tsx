import { View, Text, Button, Linking } from 'react-native';
import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { authorize } from 'react-native-app-auth';
import ENV from '../../../env';

const config = {
  issuer: 'https://accounts.google.com',
  clientId: ENV.OAUTH_CLIENT_ID,
  redirectUrl: 'https://phys3.github.io/redirectUrl/',
  scopes: ['openid', 'email'],
  usePKCE: false,
};

const EXCHANGE_AUTHORIZATION_CODE = gql`
  mutation ExchangeAuthorizationCode($code: String!) {
    exchangeToken(code: $code) {
      accessToken
      user {
        id
        email
      }
    }
  }
`;

const Authentication = () => {
  const [exchangeAuthorizationCode, { data, error }] = useMutation(
    EXCHANGE_AUTHORIZATION_CODE,
  );
  console.log('first', data, error);
  useEffect(() => {
    const handleOpenURL = async event => {
      const code = event.url
        .split('code=')[1]
        .split('&')[0]
        .replace('%2F', '/');
      console.log(code);
      if (code) {
        const { data } = await exchangeAuthorizationCode({
          variables: { code },
        });
        console.log('data', data);
      }
    };
    // Add event listener
    let listener = Linking.addEventListener('url', handleOpenURL);

    // Remove event listener on cleanup
    return () => {
      listener.remove();
    };
  }, []);
  const signIn = async () => {
    try {
      console.log('hbbhbhhb');
      const result = await authorize(config);
      console.log('resultttt', result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>Authentication</Text>
      <Button title="Sign In with Google" onPress={signIn} />
      {data && <Text>{JSON.stringify(data)}</Text>}
    </View>
  );
};

export default Authentication;
