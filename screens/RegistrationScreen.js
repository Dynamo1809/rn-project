import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { authSignUpUser } from '../redux/auth/authOperations';

const secondaryColor = '#f0f8ff';
const mainColor = '#4169e1';
const tertiaryColor = `#a52a2a`;

const initialState = {
  email: '',
  username: '',
  password: '',
};

export default function LoginScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [dimension, setDimension] = useState(Dimensions.get('window').width - 40 * 2);

  const dispatch = useDispatch();

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

  const handleSubmit = () => {
    dispatch(authSignUpUser(state));
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
          <Text style={styles.title}>Sign up to get started!</Text>
          <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <View style={{ ...styles.form, marginBottom: isShowKeyboard ? 10 : 100, width: dimension }}>
              <TextInput
                textAlign="center"
                value={state.username}
                onChangeText={(value) => setState((prevState) => ({ ...prevState, username: value }))}
                onFocus={() => setIsShowKeyboard(true)}
                placeholder="Username"
                style={styles.input}
              />
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
              <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btnTitle}>SIGN UP</Text>
              </TouchableOpacity>
              <View style={styles.redirectionContainer}>
                <Text style={styles.redirectionTitle}>Have an account?</Text>
                <TouchableOpacity style={styles.redirectionBtn} onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.redirectionText}>Log in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
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
  redirectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    justifyContent: 'center',
  },
  redirectionBtn: { border: 0 },
  redirectionTitle: { fontSize: 16 },
  redirectionText: { marginLeft: 4, color: tertiaryColor, fontSize: 16 },
});
