import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, Platform } from 'react-native';
import AuthNavigator from './src/navigation/AuthNavigator';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import {
  request,
  PERMISSIONS,
  RESULTS,
  Permission,
} from 'react-native-permissions';

const requestLocationPermission = async () => {
  const granted = await request(
    Platform.select<Permission>({
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      default: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    }),
    {
      title: 'Pixofarm',
      message: 'Pixofarm would like access to your location ',
      buttonPositive: 'Allow',
    },
  );
  return granted === RESULTS.GRANTED;
};

function App(): JSX.Element {
  useEffect(() => {
    requestLocationPermission();
  }, []);
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
