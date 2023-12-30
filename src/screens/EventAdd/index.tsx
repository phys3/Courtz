import { SafeAreaView, Dimensions } from 'react-native';
import React from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';
import EventLocation from './components/EventLocation';
import EventInfo from './components/EventInfo';
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
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'eventLocation', title: 'Event Location' },
    { key: 'eventInfo', title: 'Event Info' },
  ]);

  const renderScene = SceneMap({
    eventLocation: EventLocation,
    eventInfo: EventInfo,
  });

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
