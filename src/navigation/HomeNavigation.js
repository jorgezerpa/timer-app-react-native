import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ChronoScreen from '../screens/ChronoScreen';
import IntervalScreen from '../screens/IntervalScreen';
import TimeoutScreen from '../screens/TimeoutScreen';


const Stack = createNativeStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator initialRouteName='homeScreen'>
        <Stack.Screen name='homeScreen' component={HomeScreen} options={{ header: ()=>null }} />
        <Stack.Screen name='chronoScreen' component={ChronoScreen} options={{ header: ()=>null }} />
        <Stack.Screen name='intervalScreen' component={IntervalScreen} options={{ header: ()=>null }} />
        <Stack.Screen name='timeoutScreen' component={TimeoutScreen} options={{ header: ()=>null }} />
        {/* <Stack.Screen name='Pokemon' component={Pokemon} options={{ title:'', headerTransparent: true }} />         */}
    </Stack.Navigator>
  )
}

