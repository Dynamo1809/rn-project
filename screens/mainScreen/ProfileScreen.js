import { View, Text, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { authSignOutUser } from '../../redux/auth/authOperations';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const SignOut = () => dispatch(authSignOutUser());

  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      <Button title="Sign Out" onPress={SignOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
