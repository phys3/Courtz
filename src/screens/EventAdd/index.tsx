import { View, TextInput, Button, Text } from 'react-native';
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
