import { SafeAreaView, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { TabView } from 'react-native-tab-view';
import EventLocation from './components/EventLocation';
import EventInfo from './components/EventInfo';
import { SubmitHandler, useForm, FieldValues } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const initialLayout = {
  width: Dimensions.get('window').width,
};

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
      event_type
      age_group
      skill_level
      event_location {
        longitude
        latitude
      }
      date_time
      host_user_uid
    }
  }
`;

const schema = z.object({
  event_type: z.number(),
  age_group: z.string().optional(),
  skill_level: z.number(),
  latitude: z.number(),
  longitude: z.number(),
});

export type FormData = z.infer<typeof schema>;

const EventAdd = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'eventLocation', title: 'Event Location' },
    { key: 'eventInfo', title: 'Event Info' },
  ]);

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [createEvent] = useMutation(CREATE_EVENT, {
    onCompleted: data => {
      console.log(data);
    },
    onError: error => {
      console.log(error);
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = data => {
    console.log(data);
    const date = new Date();
    const timestamp = date.toISOString();
    console.log({
      variables: {
        event_type: parseInt(data.event_type, 10),
        age_group: data.age_group,
        skill_level: parseInt(data.skill_level, 10),
        event_location: {
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
        },
        date_time: timestamp,
        host_user_uid: '1920c272-fcf4-4b43-a6c7-3a5ec2120833',
      },
    });
    createEvent({
      variables: {
        event_type: parseInt(data.event_type, 10),
        age_group: data.age_group,
        skill_level: parseInt(data.skill_level, 10),
        event_location: {
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
        },
        date_time: timestamp,
        host_user_uid: '1920c272-fcf4-4b43-a6c7-3a5ec2120833',
      },
    });
  };

  const renderScene = ({
    route,
    jumpTo,
  }: {
    route: { key: string };
    jumpTo: (key: string) => void;
  }) => {
    switch (route.key) {
      case 'eventLocation':
        return (
          <EventLocation setValue={setValue} watch={watch} jumpTo={jumpTo} />
        );
      case 'eventInfo':
        return (
          <EventInfo
            setValue={setValue}
            onSubmit={handleSubmit(onSubmit)}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={() => null}
        swipeEnabled={false}
        initialLayout={initialLayout}
      />
    </SafeAreaView>
  );
};

export default EventAdd;
