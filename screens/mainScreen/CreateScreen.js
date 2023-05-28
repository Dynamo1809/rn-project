import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { Camera } from 'expo-camera';

const mainColor = '#4169e1';
const secondaryColor = '#f0f8ff';
const tertiaryColor = `#a52a2a`;

const CreateScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState('');

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  const sendPhoto = () => {
    navigation.navigate('Posts', { photo });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>CreateScreen</Text>
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
  header: {
    marginTop: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
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
  },
  takePhotoContainer: {
    position: 'absolute',
    top: 20,
    borderWidth: 1,
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
  sendText: { fontSize: 20, color: mainColor },
});

export default CreateScreen;
