import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import EventAdd from '../screens/EventAdd';
import Profile from '../screens/Profile';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { colors } from '../utilities/theme';
import styled from 'styled-components/native';

const Tab = createBottomTabNavigator();

const TabLabel = styled(Text)<{ focused: boolean }>`
  color: ${props => (props.focused ? colors.PRIMARY : colors.BLACK)};
  font-size: 12px;
  align-self: center;
`;

interface TabIconProps {
  focused: boolean;
  iconName: string;
}

const TabIcon: React.FC<TabIconProps> = ({ focused, iconName }) => (
  <IonIcons
    name={iconName}
    size={25}
    color={focused ? colors.PRIMARY : colors.BLACK}
  />
);

interface TabLabelProps {
  focused: boolean;
  labelText: string;
}

const TabLabelText: React.FC<TabLabelProps> = ({ focused, labelText }) => (
  <TabLabel numberOfLines={1} adjustsFontSizeToFit focused={focused}>
    {labelText}
  </TabLabel>
);

const TabNavigator = () => {
  const renderTabIcon = (props: any, iconName: string) => (
    <TabIcon {...props} iconName={iconName} />
  );
  const renderTabLabel = (props: any, labelText: string) => (
    <TabLabelText {...props} labelText={labelText} />
  );

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: props => renderTabIcon(props, 'home-sharp'), // replace with actual icon name
          tabBarLabel: props => renderTabLabel(props, 'Home'),
        }}
      />
      <Tab.Screen
        name="Add Event"
        component={EventAdd}
        options={{
          tabBarIcon: props => renderTabIcon(props, 'nuclear-sharp'), // replace with actual icon name
          tabBarLabel: props => renderTabLabel(props, 'Add Event'),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: props => renderTabIcon(props, 'notifications-outline'), // replace with actual icon name
          tabBarLabel: props => renderTabLabel(props, 'Profile'),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
