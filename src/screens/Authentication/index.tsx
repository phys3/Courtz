import { View, Text, Button, Platform } from 'react-native';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { authorize } from 'react-native-app-auth';

const config = {
  issuer: 'https://accounts.google.com',
  clientId:
    Platform.OS === 'ios'
      ? '1064752547879-72q8pkvinrks1mccla5mvilmkpmu5c0h.apps.googleusercontent.com'
      : '1064752547879-e11fn7s1rh53i5boecn45th4db3qs4j8.apps.googleusercontent.com',
  redirectUrl: 'courtz.demo:/oauth2redirect',
  scopes: ['openid', 'email'],
};

const SIGN_IN_WITH_GOOGLE = gql`
  mutation SignInWithGoogle($token: String!) {
    signInWithGoogle(token: $token) {
      user {
        id
        email
      }
    }
  }
`;

const Authentication = () => {
  const [signInWithGoogle, { data }] = useMutation(SIGN_IN_WITH_GOOGLE);
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    try {
      const result = await authorize(config);
      console.log(result);
      signInWithGoogle({ variables: { token: result.accessToken } });
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
