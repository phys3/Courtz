import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import AuthNavigator from './src/navigation/AuthNavigator';
import { GluestackUIProvider } from '@gluestack-ui/themed';

function App(): JSX.Element {
  return (
    <GluestackUIProvider>
      <NavigationContainer>
        <StatusBar
          backgroundColor={'#fff'}
          barStyle={'dark-content'}
          hidden={false}
        />
        <AuthNavigator />
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

export default App;
