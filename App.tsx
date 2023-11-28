import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'react-native';
import { NativeBaseProvider, View, extendTheme } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';

const TabLabel = styled.text`
  font-size: 12px;
  align-self: center;
`;

const Xy = () => <View />;
const theme = extendTheme({
  // Can simply pass default props to change default behaviour of components.
  components: {
    Select: {
      baseStyle: {
        _disabled: {
          bg: 'gray.100',
          borderColor: 'gray.400',
        },
      },
    },
  },
});

const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <StatusBar
          backgroundColor={'#fff'}
          barStyle={'dark-content'}
          hidden={false}
        />
        <Tab.Navigator>
          <Tab.Screen
            name="Stack"
            component={Xy}
            listeners={({ navigation }) => ({
              blur: () => navigation.setParams({ screen: undefined }),
            })}
            options={{
              unmountOnBlur: true,
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <Icon name="plus" size={20} color="black" />
              ),
              tabBarLabel: ({ focused }) => (
                <TabLabel
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  focused={focused}>
                  {'Blocks'}
                </TabLabel>
              ),
            }}
          />
          <Tab.Screen
            name="zdzdz"
            component={Xy}
            listeners={({ navigation }) => ({
              blur: () => navigation.setParams({ screen: undefined }),
            })}
            options={{
              unmountOnBlur: true,
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <Icon name="plus" size={20} color="black" />
              ),
              tabBarLabel: ({ focused }) => (
                <TabLabel
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  focused={focused}>
                  {'Blocks'}
                </TabLabel>
              ),
            }}
          />
        </Tab.Navigator>
        <SafeAreaView />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

export default App;
