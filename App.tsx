import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import AuthNavigator from './src/navigation/AuthNavigator';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { GluestackUIProvider } from '@gluestack-ui/themed';

const client = new ApolloClient({
  uri: 'http://localhost:3000/',
  cache: new InMemoryCache(),
});

function App(): JSX.Element {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default App;
