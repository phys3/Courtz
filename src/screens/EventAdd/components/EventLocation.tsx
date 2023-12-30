import { View, Dimensions } from 'react-native';
import React, { useRef, useEffect } from 'react';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { UseFormSetValue, FieldValues } from 'react-hook-form';
// import { FieldValues } from '..';

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
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  } catch (e) {
    console.log('animateToRegionError', e);
  }
};

const EventLocation: React.FC<{
  setValue: UseFormSetValue<FieldValues>;
}> = () => {
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
        showsBuildings={false}
      />
    </View>
  );
};

export default EventLocation;
