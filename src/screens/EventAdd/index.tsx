import { View, TextInput, Button, Dimensions } from 'react-native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';

const CREATE_EVENT = gql`
  mutation CreateEvent(
    $event_type: Int!
    $age_group: String
    $skill_level: Int
    $event_location: EventLocationInput!
    $date_time: String!
    $host_user_uid: ID!
  ) {
    createEvent(
      event_type: $event_type
      age_group: $age_group
      skill_level: $skill_level
      event_location: $event_location
      date_time: $date_time
      host_user_uid: $host_user_uid
    ) {
      id
    }
  }
`;

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

export const getCurrentLocation = async mapRef => {
  try {
    Geolocation.getCurrentPosition(
      position => {
        mapRef?.current?.animateToRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.07,
          longitudeDelta: 0.07 * ASPECT_RATIO,
        });
      },
      error => {
        console.log(error);
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    );
  } catch (e) {
    console.log('animateToRegionError', e);
  }
};
const EventAdd = () => {
  const { handleSubmit, setValue } = useForm();
  const [createEvent] = useMutation(CREATE_EVENT);

  const onSubmit = data => {
    console.log(data);
    createEvent({ variables: data });
  };
  return (
    <View>
      <TextInput
        placeholder="Event Type"
        onChangeText={text => setValue('event_type', text)}
      />
      <TextInput
        placeholder="Age Group"
        onChangeText={text => setValue('age_group', text)}
      />
      <TextInput
        placeholder="Skill Level"
        onChangeText={text => setValue('skill_level', text)}
      />
      <TextInput
        placeholder="Event Location"
        onChangeText={text => setValue('event_location', text)}
      />
      <TextInput
        placeholder="Date Time"
        onChangeText={text => setValue('date_time', text)}
      />
      <TextInput
        placeholder="Host User UID"
        onChangeText={text => setValue('host_user_uid', text)}
      />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default EventAdd;
