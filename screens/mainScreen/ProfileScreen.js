import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { authSignOutUser } from '../../redux/auth/authOperations';

import db from '../../firebase/config';

const tertiaryColor = `#a52a2a`;

const ProfileScreen = () => {
  const [userPosts, setUserPosts] = useState([]);
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);

  const signOut = () => dispatch(authSignOutUser());

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    await db
      .firestore()
      .collection('posts')
      .where('userId', '==', userId)
      .onSnapshot((data) => setUserPosts(data.docs.map((doc) => ({ ...doc.data() }))));
  };

  return (
    <View style={styles.container}>
      <Button style={styles.button} title="Sign Out" onPress={signOut} />
      <View>
        <FlatList
          data={userPosts}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.photo }} style={styles.image} />
              <View>
                <Text style={styles.commentText}>{item.comment}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },
  image: {
    height: 150,
    width: '90%',
  },
  commentText: {
    fontSize: 18,
    color: tertiaryColor,
  },
});

export default ProfileScreen;
