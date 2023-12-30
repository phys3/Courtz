import { SafeAreaView, Text, Button } from 'react-native';
import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import { AuthContext } from '../../navigation/AuthNavigator';
import * as Keychain from 'react-native-keychain';

const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_EVENTS);
  const { setIsSignedIn, setToken, setUserId } = useContext(AuthContext);
  console.log('data', data, loading, error);
  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error :</Text>;
  }

  return (
    <SafeAreaView>
      {data.events.map(({ id }: { id: string }) => (
        <Text key={id}>{id}</Text>
      ))}
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
