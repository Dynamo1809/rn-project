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

const secondaryColor = '#f0f8ff';
const mainColor = '#4169e1';

const initialState = {
  email: '',
  password: '',
};

export default function LoginScreen() {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [dimension, setDimension] = useState(Dimensions.get('window').width - 40 * 2);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width - 40 * 2;
      setDimension(width);
    };
    const subscription = Dimensions.addEventListener('change', onChange);
    return () => {
      subscription.remove();
    };
  }, []);

  const onLogin = () => {
    Alert.alert('Credentials:', `${state.email} + ${state.password}`);
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground style={styles.image} source={require('../images/beach.jpg')}>
          <Text style={styles.title}>Welcome!</Text>
          <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <View style={{ ...styles.form, marginBottom: isShowKeyboard ? 10 : 100, width: dimension }}>
              <TextInput
                textAlign="center"
                value={state.email}
                onChangeText={(value) => setState((prevState) => ({ ...prevState, email: value }))}
                onFocus={() => setIsShowKeyboard(true)}
                placeholder="Email"
                style={styles.input}
              />
              <TextInput
                textAlign="center"
                value={state.password}
                onChangeText={(value) => setState((prevState) => ({ ...prevState, password: value }))}
                onFocus={() => setIsShowKeyboard(true)}
                placeholder="Password"
                secureTextEntry={true}
                style={styles.input}
              />
              <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={onLogin}>
                <Text style={styles.btnTitle}>SIGN IN</Text>
              </TouchableOpacity>
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
    backgroundColor: secondaryColor,
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
  },
  input: {
    height: 44,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: mainColor,
    color: mainColor,
    backgroundColor: secondaryColor,
    fontSize: 20,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    marginTop: 10,
    marginHorizontal: 80,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: mainColor,
  },
  btnTitle: {
    color: secondaryColor,
    fontSize: 16,
  },
});