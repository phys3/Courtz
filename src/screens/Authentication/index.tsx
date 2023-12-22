import { View, Text, Button, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { authorize } from 'react-native-app-auth';

const config = {
  issuer: 'https://accounts.google.com',
  clientId:
    '1064752547879-a424peht7om00hf60fn7s7eite7bpl0q.apps.googleusercontent.com',
  redirectUrl: 'https://phys3.github.io/redirectUrl/',
  scopes: ['openid', 'email'],
};

const EXCHANGE_AUTHORIZATION_CODE = gql`
  mutation ExchangeAuthorizationCode($code: String!) {
    exchangeAuthorizationCode(code: $code) {
      accessToken
      user {
        id
        email
      }
    }
  }
`;

const Authentication = () => {
  const [exchangeAuthorizationCode, { data }] = useMutation(
    EXCHANGE_AUTHORIZATION_CODE,
  );
  console.log('first');
  useEffect(() => {
    const handleOpenURL = event => {
      const code = event.url.split('code=')[1].split('&')[0];
      console.log(code);
      console.log(event.url.split('code=')[1]);
      if (code) {
        exchangeAuthorizationCode({ variables: { code } });
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
      console.log(result);
      // signInWithGoogle({ variables: { token: result.accessToken } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>Authentication</Text>
      <Button title="Sign In with Google" onPress={signIn} />
    </View>
  );
};

export default Authentication;
