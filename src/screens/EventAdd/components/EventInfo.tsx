import { Button } from 'react-native';
import React from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import Input from '../../../components/Input';
import styled from 'styled-components/native';
import { FormData } from '..';

const Container = styled.View`
  flex: 1;
  padding: 16px;
`;
const getErrorMessage = (errors: FieldErrors<FieldValues>, name: string) => {
  return errors?.[name]?.message as string | undefined;
};
const EventInfo: React.FC<{
  onSubmit: () => void;
  errors: FieldErrors<FieldValues>;
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
}> = ({ onSubmit, errors, setValue, watch }) => {
  console.log('errors', errors);

  return (
    <Container>
      <Input
        value={watch('event_type')}
        setValue={text => setValue('event_type', text)}
        error={getErrorMessage(errors, 'event_type')}
        label={'Event Type'}
        placeholder={'Event Type'}
        type={'number-pad'}
      />
      <Input
        value={watch('age_group')}
        setValue={text => setValue('age_group', text)}
        error={getErrorMessage(errors, 'age_group')}
        label={'Age Group'}
        placeholder={'Age Group'}
      />
      <Input
        value={watch('skill_level')}
        setValue={text => setValue('skill_level', text)}
        error={getErrorMessage(errors, 'skill_level')}
        label={'Skill Level'}
        placeholder={'Skill Level'}
        type={'number-pad'}
      />
      <Button title="Submit" onPress={onSubmit} />
    </Container>
  );
};

export default EventInfo;
