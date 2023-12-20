import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { NativeBaseProvider, extendTheme } from 'native-base';
import TabNavigator from './src/navigation/TabNavigator';

const theme = extendTheme({
  // Can simply pass default props to change default behaviour of components.
  components: {
    Select: {
      baseStyle: {
        _disabled: {
          bg: 'gray.100',
          borderColor: 'gray.400',
        },
      },
    },
  },
});

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <StatusBar
          backgroundColor={'#fff'}
          barStyle={'dark-content'}
          hidden={false}
        />
        <TabNavigator />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

export default App;
