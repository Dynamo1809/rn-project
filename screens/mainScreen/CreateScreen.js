import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import { v4 as uuidv4 } from 'uuid';

import db from '../../firebase/config';

const mainColor = '#4169e1';
const secondaryColor = '#f0f8ff';

const CreateScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState('');
  const [comment, setComment] = useState(null);
  const [location, setLocation] = useState(null);

  const takePhoto = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    const location = await Location.getCurrentPositionAsync();
  };

  const sendPhoto = () => {
    uploadPhotoToServer();
    navigation.navigate('DefaultScreen', { photo });
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const postId = uuidv4();
    const data = await db.storage().ref(`postImage/${postId}`).put(file);

    const processedPhoto = await db.storage().ref('postImage').child(postId).getDownloadURL();
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image source={{ uri: photo }} style={styles.photo} />
          </View>
        )}
        <TouchableOpacity
          onPress={() => {
            takePhoto();
          }}
          style={styles.snapContainer}
        >
          <Text style={styles.snap}>Snap</Text>
        </TouchableOpacity>
      </Camera>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            sendPhoto();
          }}
          style={styles.sendButton}
        >
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    alignItems: 'center',
    marginTop: 20,
    height: '40%',
    borderRadius: 10,
  },
  snapContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '55%',
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: secondaryColor,
  },
  snap: {
    color: secondaryColor,
  },
  photo: {
    height: 150,
    width: 150,
    borderRadius: 10,
  },
  takePhotoContainer: {
    position: 'absolute',
    top: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: secondaryColor,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginHorizontal: 70,
    height: 40,
    borderWidth: 2,
    borderRadius: 10,
    color: mainColor,
    borderColor: mainColor,
  },
  inputContainer: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: mainColor,
    padding: 10,
    fontSize: 18,
  },
  sendText: { fontSize: 20, color: mainColor },
});

export default CreateScreen;
