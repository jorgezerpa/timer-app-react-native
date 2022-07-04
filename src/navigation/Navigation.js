import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from '../screens/HomeScreen';
import HomeNavigation from './HomeNavigation';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator initialRouteName='home'>
        <Tab.Screen name='home' component={HomeNavigation} options={{ header: ()=>null, tabBarLabel:'', tabBarIcon: ({ color, size })=><Icon name='user' color={color} size={size} /> }} />
    </Tab.Navigator>
  )
}

