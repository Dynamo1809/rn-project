import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';

const AuthStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen options={{ headerShown: false }} name="Registration" component={RegistrationScreen} />
        <AuthStack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
