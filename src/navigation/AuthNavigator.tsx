import React, { useEffect, createContext, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Authentication from '../screens/Authentication';
import TabNavigator from './TabNavigator';
import * as Keychain from 'react-native-keychain';
import ApolloProviderWithAuth from './ApolloProvider';

export const AuthContext = createContext({
  isSignedIn: false,
  setIsSignedIn: (_value: boolean) => {},
  token: '',
  setToken: (_value: string) => {},
});

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const checkToken = async () => {
      const credentials = await Keychain.getGenericPassword();
      setIsSignedIn(!!credentials);
      setToken(credentials ? credentials.password : '');
      console.log(
        'checkTokenCredentials',
        credentials ? credentials.password : '',
      );
    };

    checkToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isSignedIn, setIsSignedIn, token, setToken }}>
      <ApolloProviderWithAuth>
        {isSignedIn ? (
          <TabNavigator />
        ) : (
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Authentication} />
          </Stack.Navigator>
        )}
      </ApolloProviderWithAuth>
    </AuthContext.Provider>
  );
};

export default AuthNavigator;
