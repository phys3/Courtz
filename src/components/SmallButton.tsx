import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../utilities/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  ActivityIndicator,
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  Text,
} from 'react-native';

const ButtonContainer = styled(TouchableOpacity)<{
  outlineStyle: boolean;
  disabled: boolean;
}>`
  align-items: center;
  background-color: ${props =>
    props.disabled ? '#F8F9F9' : props.outlineStyle ? 'white' : colors.PRIMARY};
  padding-right: 16px;
  padding-left: 16px;
  padding-vertical: 6px;
  border-radius: 5px;
  justify-content: center;
  flex-direction: row;
  margin-top: 16px;
  border: ${props =>
    props.disabled
      ? '1px solid #cbd1d6'
      : props.outlineStyle
      ? '1px solid #cbd1d6'
      : '0px'};
`;

const ButtonText = styled(Text)<{
  outlineStyle: boolean;
  bold: boolean;
  disabled: boolean;
  style: TextStyle;
}>`
  text-align: center;
  color: ${props =>
    props.disabled ? '#b2bac2' : props.outlineStyle ? colors.PRIMARY : '#fff'};
  font-size: 16px;
  line-height: 24px;
  font-weight: ${props => (props.bold ? '600' : '400')};
`;
interface SmallButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
  bold?: boolean;
  outlineStyle?: boolean;
  loading?: boolean;
  whiteSpinner?: boolean;
}

const SmallButton: React.FC<SmallButtonProps> = ({
  title,
  onPress,
  disabled,
  containerStyle,
  titleStyle,
  icon,
  bold,
  outlineStyle,
  loading,
  whiteSpinner,
  ...props
}) => {
  return (
    <ButtonContainer
      onPress={onPress}
      disabled={!!(disabled || loading)}
      style={containerStyle}
      outlineStyle={!!outlineStyle}
      {...props}>
      {loading ? (
        <ActivityIndicator
          size={'small'}
          color={whiteSpinner ? colors.WHITE : colors.PRIMARY}
          style={{ padding: 2, paddingHorizontal: 8 }}
        />
      ) : (
        <ButtonText
          outlineStyle={!!outlineStyle}
          bold={!!bold}
          style={titleStyle as TextStyle}
          disabled={!!disabled}>
          {title}
        </ButtonText>
      )}
      {icon && (
        <Icon
          name={'arrow-forward'}
          color={disabled ? '#b2bac2' : '#fff'}
          size={24}
          style={{
            marginLeft: 12,
          }}
        />
      )}
    </ButtonContainer>
  );
};

export default SmallButton;
