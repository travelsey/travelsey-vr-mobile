import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding from './Onboarding';
import Landing from './Landing';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Landing" component={Landing} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;