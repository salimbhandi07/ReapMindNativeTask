import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';

const signUp = async (fullname, email, password) => {
  if (!fullname || !email || !password) {
    Alert.alert('Error', 'Enter all the required data');
    return;
  }

  try {
    const cred = await auth().createUserWithEmailAndPassword(email, password);

    await auth().currentUser.updateProfile({displayName: fullname});
    await AsyncStorage.setItem('userUID', cred.user.uid);
    return {
      user: cred?.user,
    };
  } catch (err) {
    Alert.alert('Error', err.message);
    return null;
  }
};

const signIn = async (email, password) => {
  if (!email || !password) {
    Alert.alert('Error', 'Please enter both email and password');
    return;
  }

  try {
    const cred = await auth().signInWithEmailAndPassword(email, password);
    const uid = cred.user.uid;
    await AsyncStorage.setItem('userUID', uid);
    return {
      user: cred.user,
    };
  } catch (err) {
    Alert.alert('Error', err.message);
  }
};

const signOut = async () => {
  try {
    await auth().signOut();
  } catch (err) {
    Alert.alert('Error', err.message);
  }
};

const getCurrentUserProfile = async () => {
  try {
    const currentUser = auth().currentUser;
    if (currentUser) {
      return {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        email: currentUser.email,
      };
    } else {
      Alert.alert('Error', 'No user is currently signed in');
      return null;
    }
  } catch (err) {
    Alert.alert('Error', err.message);
    return null;
  }
};

const Auth = {signIn, signUp, signOut, getCurrentUserProfile};

export default Auth;
