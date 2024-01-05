import { View, Dimensions } from 'react-native';
import React, { useRef, useEffect } from 'react';
import MapView, { PROVIDER_DEFAULT, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/Ionicons';
import { gql, useLazyQuery } from '@apollo/client';

const GET_EVENTS_BY_PROXIMITY = gql`
  query GetEventsByProximity($latitude: Float!, $longitude: Float!) {
    getEventsByProximity(latitude: $latitude, longitude: $longitude) {
      date_created
      age_group
      date_time
      date_updated
      event_location {
        longitude
        latitude
      }
      host_user_uid
      event_type
      id
      skill_level
    }
  }
`;
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
export const latDelta = 12;
export const lngDelta = latDelta * ASPECT_RATIO;

export const EventMarker = ({
  marker,
}: {
  marker: { latitude: number; longitude: number };
}) => {
  return (
    <Marker
      tracksViewChanges={false}
      style={{ justifyContent: 'center', alignItems: 'center' }}
      coordinate={{
        latitude: marker.latitude,
        longitude: marker.longitude,
      }}
      anchor={{ x: 0.52, y: 0.48 }}
      centerOffset={{ x: -0.5, y: 0 }}>
      <Icon name={'radio-button-on'} color={'white'} size={23} />
    </Marker>
  );
};

const EventLocation = () => {
  const mapRef: React.MutableRefObject<MapView | null> = useRef(null);
  const [getEventsByProximity, { loading, data, error }] = useLazyQuery(
    GET_EVENTS_BY_PROXIMITY,
  );
  console.log(data?.getEventsByProximity, error, loading);
  useEffect(() => {
    try {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          getEventsByProximity({
            variables: { latitude, longitude },
          });
          mapRef?.current?.animateToRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.07,
            longitudeDelta: 0.07 * ASPECT_RATIO,
          });
        },
        err => {
          console.log(err);
        },
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
      );
    } catch (e) {
      console.log('Error fetching location and events', e);
    }
  }, [getEventsByProximity]);
  return (
    <View>
      <MapView
        ref={mapRef}
        style={{ height: '100%', width: '100%' }}
        onPress={event => {
          console.log(event.nativeEvent.coordinate);
          const { latitude, longitude } = event.nativeEvent.coordinate;
          getEventsByProximity({ variables: { latitude, longitude } });
        }}
        initialRegion={{
          latitude: 50.78,
          longitude: 12.14,
          latitudeDelta: latDelta,
          longitudeDelta: lngDelta,
        }}
        toolbarEnabled={false}
        provider={PROVIDER_DEFAULT}
        mapType={'hybrid'}
        scrollEnabled={true}
        showsMyLocationButton={false}
        showsPointsOfInterest={false}
        showsCompass={false}
        loadingEnabled={true}
        showsUserLocation={false}
        showsBuildings={false}>
        {Array.isArray(data?.getEventsByProximity) &&
          data.getEventsByProximity.map(
            (event: {
              id: string;
              event_location: { latitude: any; longitude: any };
            }) => (
              <EventMarker
                key={event.id}
                marker={{
                  latitude: event.event_location.latitude,
                  longitude: event.event_location.longitude,
                }}
              />
            ),
          )}
      </MapView>
    </View>
  );
};

export default EventLocation;
