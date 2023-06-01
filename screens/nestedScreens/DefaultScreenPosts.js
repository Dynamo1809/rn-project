import { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image, Button, Text } from 'react-native';

const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.photo }} style={styles.image} />
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      <Button title="Go to Map" onPress={() => navigation.navigate('Map')}></Button>
      <Button title="Go to Comments" onPress={() => navigation.navigate('Comments')}></Button>
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
});

export default DefaultScreenPosts;
