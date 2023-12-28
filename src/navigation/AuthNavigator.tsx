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
  userId: '',
  setUserId: (_value: string) => {},
  setToken: (_value: string) => {},
});

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const checkToken = async () => {
      const credentials = await Keychain.getGenericPassword();
      setIsSignedIn(!!credentials);
      setToken(credentials ? credentials.password : '');
      setUserId(credentials ? credentials.username : '');
      console.log(
        'checkTokenCredentials',
        credentials ? credentials.password : '',
      );
    };

    checkToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isSignedIn, setIsSignedIn, token, setToken, userId, setUserId }}>
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
