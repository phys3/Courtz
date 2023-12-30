import { View } from 'react-native';
import React from 'react';
import { FieldErrors, FieldValues } from 'react-hook-form';

const EventInfo: React.FC<{
  onSubmit: () => void;
  errors: FieldErrors<FieldValues>;
}> = () => {
  return <View />;
};

export default EventInfo;
