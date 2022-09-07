import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, StyleSheet, View, TextInput, Button, Text, Image, FlatList } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userItem: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  userDetails: {
    justifyContent: 'center',
  },
});
