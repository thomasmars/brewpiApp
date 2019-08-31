import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import WifiScreen from '../screens/WifiScreen';
import TiltMonitorScreen from "../screens/TiltMonitorScreen";
import ConnectWifiScreen from "../screens/ConnectWifiScreen";

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'md-information-circle'}
    />
  ),
};

const TiltStack = createStackNavigator({
  Tilt: TiltMonitorScreen,
});

TiltStack.navigationOptions = {
  tabBarLabel: 'Tilt',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'md-options'} />
  )
};

const WifiStack = createStackNavigator(
  {
    Wifi: WifiScreen,
    WifiConnect: ConnectWifiScreen,
  },
);

WifiStack.navigationOptions = {
  tabBarLabel: 'Wifi',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-wifi'} />
  ),
};

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  TiltStack,
  WifiStack,
});

export default tabNavigator;
