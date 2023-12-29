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
}

const TabIcon: React.FC<TabIconProps> = ({ focused }) => (
  <IonIcons
    name="alarm"
    size={25}
    color={focused ? colors.PRIMARY : colors.BLACK}
  />
);

const TabLabelText: React.FC<TabIconProps> = ({ focused }) => (
  <TabLabel numberOfLines={1} adjustsFontSizeToFit focused={focused}>
    {'Support'}
  </TabLabel>
);

const TabNavigator = () => {
  const renderTabIcon = (props: any) => <TabIcon {...props} />;
  const renderTabLabel = (props: any) => <TabLabelText {...props} />;

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: renderTabIcon,
          tabBarLabel: renderTabLabel,
        }}
      />
      <Tab.Screen name="Add Event" component={EventAdd} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
