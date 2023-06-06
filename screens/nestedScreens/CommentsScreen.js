import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import db from '../../firebase/config';

const mainColor = '#4169e1';
const tertiaryColor = `#a52a2a`;

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const { postId } = route.params;

  const { nickname } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllComments();
  }, []);

  const createComment = async () => {
    if (comment !== '') {
      await db.firestore().collection('posts').doc(postId).collection('comments').add({ nickname, comment });
    }
  };

  const getAllComments = async () => {
    await db
      .firestore()
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .onSnapshot((data) => setAllComments(data.docs.map((doc) => ({ ...doc.data() }))));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={allComments}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <View style={styles.commentContainer}>
                <Text style={styles.nickname}>{item.nickname}</Text>
                <Text style={styles.comment}>{item.comment}</Text>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} onChangeText={setComment} />
      </View>
      <TouchableOpacity onPress={createComment} style={styles.sendButton}>
        <Text style={styles.sendText}>Add comment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  commentContainer: {
    marginBottom: 5,
    borderWidth: 1,
    borderColor: mainColor,
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 6,
  },
  nickname: {
    fontSize: 18,
    color: tertiaryColor,
  },
  comment: {
    fontSize: 16,
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
    textAlign: 'center',
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 70,
    height: 40,
    borderWidth: 2,
    borderRadius: 10,
    color: mainColor,
    borderColor: mainColor,
  },
  sendText: { fontSize: 20, color: mainColor },
});

export default CommentsScreen;
