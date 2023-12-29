import React, { useState } from 'react';
import styled from 'styled-components/native';
import { colors } from '../utilities/theme';
import {
  Platform,
  View,
  ViewStyle,
  TextInput,
  KeyboardTypeOptions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Label = styled.Text`
  font-size: 14px;
  margin-bottom: 8px;
  margin-top: 18px;
  color: ${props => (props.disabled ? '#B2BAC2' : 'black')};
`;

const Error = styled.Text`
  font-size: 12px;
  color: ${colors.ERROR_RED};
`;
interface StyledInputProps {
  error?: string;
  isFocused?: boolean;
  disabled?: boolean;
}
const StyledInput = styled(TextInput)<StyledInputProps>`
  border-radius: 5px;
  border-width: 1px;
  border-color: ${props => {
    switch (true) {
      case !!props.error:
        return colors.ERROR_RED;
      case props.isFocused:
        return colors.PRIMARY;
      case props.disabled:
        return '#cbd1d6';
      default:
        return '#CBD1D6';
    }
  }};
  padding-horizontal: 12px;
  padding-vertical: ${() => (Platform.OS === 'ios' ? '18px' : 'auto')};
  font-size: 12px;
  width: 100%;
  color: ${props => (props.disabled ? '#B2BAC2' : colors.GRAY)}
  background-color: ${props => (props.disabled ? '#F8F9F9' : 'white')}
`;

const Row = styled(View)<{ mr?: boolean; error?: string }>`
  flex-direction: row;
  align-items: center;
  justify-items: center;
  margin-right: ${props => (props.mr ? 12 : 0)}px;
`;

interface InputProps {
  value: string;
  setValue: (value: string) => void;
  error?: string;
  label?: string;
  inputStyle?: ViewStyle;
  placeholder?: string;
  type?: KeyboardTypeOptions;
  secureEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  value,
  setValue,
  error,
  label,
  inputStyle,
  placeholder,
  type,
  secureEntry,
  autoCapitalize,
  disabled,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={inputStyle}>
      {label && <Label disabled={disabled}>{label}</Label>}
      <Row error={error}>
        <StyledInput
          autoCorrect={false}
          onChangeText={setValue}
          value={value}
          error={error}
          placeholder={placeholder}
          isFocused={isFocused}
          placeholderTextColor={'#b2bac2'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={secureEntry}
          keyboardType={type}
          autoCapitalize={autoCapitalize}
          disabled={disabled}
          editable={!disabled}
          {...props}
        />
      </Row>
      {error && (
        <Row mr>
          <Icon name="alert-circle" size={12} color={colors.ERROR_RED} />
          <Error> {error}</Error>
        </Row>
      )}
    </View>
  );
};

export default Input;
