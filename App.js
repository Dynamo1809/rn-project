import { useCallback, useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Entypo from '@expo/vector-icons/Entypo';
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
  Button,
  ImageBackground,
} from 'react-native';

export default function App() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const nameHandler = (text) => setName(text);
  const passwordHandler = (text) => setPassword(text);

  const onLogin = () => {
    Alert.alert('Credentials:', `${name} + ${password}`);
  };
  // onLayout = { onLayoutRootView };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground style={styles.image} source={require('./images/beach.jpg')} resizeMode="cover">
          <Text style={styles.title}>Welcome</Text>
          <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <View>
              <TextInput
                textAlign="center"
                value={name}
                onChangeText={nameHandler}
                placeholder="Username"
                style={styles.input}
              />
              <TextInput
                textAlign="center"
                value={password}
                onChangeText={passwordHandler}
                placeholder="Password"
                secureTextEntry={true}
                style={styles.input}
              />
              <Button title={'Login'} style={styles.input} onPress={onLogin} />
            </View>
          </KeyboardAvoidingView>

          <StatusBar style="auto" />
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    marginBottom: 20,
  },
  input: {
    color: '#fff',
    fontSize: 20,
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
