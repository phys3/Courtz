import { View, Dimensions } from 'react-native';
import React, { useRef, useEffect } from 'react';
import MapView, { PROVIDER_DEFAULT, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import Icon from 'react-native-vector-icons/Ionicons';
import SmallButton from '../../../components/SmallButton';
import { FormData } from '..';

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
export const latDelta = 12;
export const lngDelta = latDelta * ASPECT_RATIO;

export const getCurrentLocation = async (
  mapRef: React.MutableRefObject<MapView | null>,
) => {
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

const EventLocation: React.FC<{
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
  jumpTo: (key: string) => void;
}> = ({ setValue, watch, jumpTo }) => {
  const mapRef = useRef(null);
  useEffect(() => {
    getCurrentLocation(mapRef);
  }, []);
  return (
    <View>
      <MapView
        ref={mapRef}
        style={{ height: '100%', width: '100%' }}
        onPress={event => {
          console.log(event.nativeEvent.coordinate);
          setValue('latitude', event.nativeEvent.coordinate.latitude);
          setValue('longitude', event.nativeEvent.coordinate.longitude);
          (mapRef.current as unknown as MapView)?.animateToRegion({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002 * ASPECT_RATIO,
          });
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
        {watch('latitude') && (
          <EventMarker
            marker={{
              latitude: watch('latitude'),
              longitude: watch('longitude'),
            }}
          />
        )}
      </MapView>
      {watch('latitude') && (
        <SmallButton
          icon
          containerStyle={{ position: 'absolute', bottom: 20, right: 20 }}
          title="Next"
          onPress={() => jumpTo('eventInfo')}
        />
      )}
    </View>
  );
};

export default EventLocation;
