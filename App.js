import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screens/Home'
import UserDetails from './src/screens/UserDetails'

export default function App() {

const Stack = createNativeStackNavigator();

  return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="UserDetails" component={UserDetails} />
          </Stack.Navigator>
        </NavigationContainer>
  );
}
