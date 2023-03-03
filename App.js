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
} from 'react-native';

// SplashScreen.preventAutoHideAsync();

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
  //   'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
  // });
  // const getFonts = async function () {
  //   await Font.loadAsync({
  //     'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
  //     'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
  //   });
  // };

  // const [isReady, setIsReady] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       await Font.loadAsync(Entypo.font);
  //       await new Promise((resolve) => setTimeout(resolve, 2000));
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       setIsReady(true);
  //     }
  //   }
  //   prepare();
  // }, []);

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }

  const nameHandler = (text) => setName(text);
  const passwordHandler = (text) => setPassword(text);

  const onLogin = () => {
    Alert.alert('Credentials:', `${name} + ${password}`);
  };
// onLayout = { onLayoutRootView };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Roboto!</Text>
        <Text style={{ fontSize: 20 }} >Welcome basic!</Text>
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
          <TextInput value={name} onChangeText={nameHandler} placeholder="Username" style={styles.input} />
          <TextInput
            value={password}
            onChangeText={passwordHandler}
            placeholder="Password"
            secureTextEntry={true}
            style={styles.input}
          />
          <Button title={'Login'} style={styles.input} onPress={onLogin} />
        </KeyboardAvoidingView>

        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 25,
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});
