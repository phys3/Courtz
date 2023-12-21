import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Authentication from '../screens/Authentication';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();
const isSignedIn = true;
const AuthNavigator = () => {
  return isSignedIn ? (
    <TabNavigator />
  ) : (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Authentication} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
