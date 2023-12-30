import { SafeAreaView, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { TabView } from 'react-native-tab-view';
import EventLocation from './components/EventLocation';
import EventInfo from './components/EventInfo';
import { SubmitHandler, useForm, FieldValues } from 'react-hook-form';
// import { gql, useMutation } from '@apollo/client';

const initialLayout = {
  width: Dimensions.get('window').width,
};

// const CREATE_EVENT = gql`
//   mutation CreateEvent(
//     $event_type: Int!
//     $age_group: String
//     $skill_level: Int
//     $event_location: EventLocationInput!
//     $date_time: String!
//     $host_user_uid: ID!
//   ) {
//     createEvent(
//       event_type: $event_type
//       age_group: $age_group
//       skill_level: $skill_level
//       event_location: $event_location
//       date_time: $date_time
//       host_user_uid: $host_user_uid
//     ) {
//       id
//     }
//   }
// `;

const EventAdd = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'eventLocation', title: 'Event Location' },
    { key: 'eventInfo', title: 'Event Info' },
  ]);

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const [createEvent] = useMutation(CREATE_EVENT);

  const onSubmit: SubmitHandler<FieldValues> = data => {
    console.log(data);
    // createEvent({
    //   variables: {
    //     event_type: parseInt(data.event_type, 10),
    //     age_group: data.age_group,
    //     skill_level: parseInt(data.skill_level, 10),
    //     event_location: {
    //       latitude: parseFloat(data.latitude),
    //       longitude: parseFloat(data.longitude),
    //     },
    //     date_time: data.date_time,
    //     host_user_uid: data.host_user_uid,
    //   },
    // });
  };

  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case 'eventLocation':
        return <EventLocation setValue={setValue} />;
      case 'eventInfo':
        return <EventInfo onSubmit={handleSubmit(onSubmit)} errors={errors} />;
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
        initialLayout={initialLayout}
      />
    </SafeAreaView>
  );
};

export default EventAdd;
