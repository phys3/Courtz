import { SafeAreaView, Button } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../../navigation/AuthNavigator';
import * as Keychain from 'react-native-keychain';
import { NavigationProp } from '@react-navigation/native';

const Home = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const { setIsSignedIn, setToken, setUserId } = useContext(AuthContext);

  return (
    <SafeAreaView>
      <Button
        title="Find Event On Map"
        onPress={() => {
          navigation.navigate('EventFind');
        }}
      />
      <Button
        title="Logout"
        onPress={async () => {
          await Keychain.resetGenericPassword();
          setToken('');
          setUserId('');
          setIsSignedIn(false);
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
