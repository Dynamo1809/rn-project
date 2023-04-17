import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import LoginScreen from './screens/LoginScreen';

export default function App() {
  return (
    <>
      <LoginScreen />
    </>
  );
}
