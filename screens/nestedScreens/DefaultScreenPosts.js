import { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image, Button, Text } from 'react-native';

import db from '../../firebase/config';

const tertiaryColor = `#a52a2a`;

const DefaultScreenPosts = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    await db
      .firestore()
      .collection('posts')
      .onSnapshot((data) => setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.photo }} style={styles.image} />
            <View>
              <Text style={styles.commentText}>{item.comment}</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <Button title="Location" onPress={() => navigation.navigate('Map', { location: item.location })}></Button>
              <Button title="Comments" onPress={() => navigation.navigate('Comments', { postId: item.id })}></Button>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },
  image: {
    height: 180,
    width: '90%',
  },
  commentText: {
    fontSize: 18,
    color: tertiaryColor,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default DefaultScreenPosts;
