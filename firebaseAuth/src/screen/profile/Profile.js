import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {
  fetchProfile,
  fetchUserProfile,
  updateProfile,
} from '../../../redux/slice/authSlice';
import {Auth} from '../../services';
import Toast from 'react-native-toast-message';

const windowHeight = Dimensions.get('window').height;
const eightyPercentHeight = windowHeight * 0.65;

export const Profile = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [isEditing, setIsEditing] = useState(false);
  const data = useSelector(state => state?.auth?.profile);
  const user = useSelector(state => state?.auth?.profileDetails);

  const [userData, setUserData] = useState({
    name: user?.user?.name || data?.displayName || '',
    email: user?.user?.email || data?.email || '',
    phoneNumber: user?.user?.phoneNumber || data?.phoneNumber || '',
    address: user?.user?.address || '123 Main St, City, Country',
    avtar: '',
  });

  const fetchUserData = async () => {
    try {
      const storedUid = await AsyncStorage.getItem('userUID');
      dispatch(fetchUserProfile(storedUid || data?.uid));
      dispatch(fetchProfile(storedUid || data?.uid));

      setUid(storedUid);
    } catch (err) {}
  };

  useEffect(() => {
    fetchUserData();
    setIsEditing(false);
  }, [isFocused]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userUID');
      await Auth.signOut();
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'User logged out',
      });
    } catch (error) {
      console.error('Logout Error: ', error);
    }
  };
  const handleChange = (field, value) => {
    setUserData(prevData => ({...prevData, [field]: value}));
  };

  const handleUpdateProfile = async () => {
    try {
      dispatch(updateProfile(userData));
      fetchUserData();
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Profile updated',
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Update Error: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardDismissMode="on-drag">
        <View>
          <View style={styles.profileImageContainer}>
            {userData.avtar === '' ? (
              <Icon name={'person'} size={60} style={styles.profileImage} />
            ) : (
              <Image
                source={{uri: userData.avtar}}
                style={styles.profileImage}
              />
            )}
            <Text style={styles.profileText} numberOfLines={1}>
              {userData.name}
            </Text>
          </View>
          <View style={styles.innerView}>
            {isEditing ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.input}
                  value={userData.name}
                  onChangeText={text => handleChange('name', text)}
                  placeholder="Name"
                  numberOfLines={1}
                />
                <View style={styles.detailContainer}>
                  <Text style={styles.detailValue} numberOfLines={1}>
                    {userData.email || '123 Main St, City, Country'}
                  </Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={userData.phoneNumber}
                  onChangeText={text => handleChange('phoneNumber', text)}
                  placeholder="Phone Number"
                  keyboardType="phone-pad"
                  numberOfLines={1}
                />
                <TextInput
                  numberOfLines={2}
                  style={styles.input}
                  value={userData.address}
                  onChangeText={text => handleChange('address', text)}
                  placeholder="Address"
                />
              </View>
            ) : (
              <>
                <View style={styles.detailContainer}>
                  <Text style={styles.detailLabel}>Email :</Text>
                  <Text style={styles.detailValue} numberOfLines={1}>
                    {userData.email || 'No email'}
                  </Text>
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.detailLabel}>Mobile :</Text>
                  <Text style={styles.detailValue} numberOfLines={1}>
                    {userData.phoneNumber || '9876541235'}
                  </Text>
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.detailLabel}>Address :</Text>
                  <Text numberOfLines={1} style={styles.detailValue}>
                    {userData.address}
                  </Text>
                </View>
              </>
            )}

            <View style={styles.buttonContainer}>
              {isEditing ? (
                <TouchableOpacity
                  onPress={handleUpdateProfile}
                  style={styles.updateButton}>
                  <Icon name="save" size={25} color="#fff" />
                  <Text style={styles.updateText}>Save</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setIsEditing(true)}
                  style={styles.updateButton}>
                  <Icon name="edit" size={25} color="#fff" />
                  <Text style={styles.updateText}>Update</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}>
                <Icon name="logout" size={25} color="#fff" />
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileImageContainer: {
    marginBottom: 10,
    alignItems: 'center',
    paddingTop: 15,
  },
  profileImage: {
    padding: 20,
    width: 100,
    height: 100,
    backgroundColor: '#003384',
    color: '#fff',
    borderRadius: 50,
    marginBottom: 10,
    alignSelf: 'center',
  },
  profileText: {
    fontWeight: '700',
    fontSize: 30,
    textDecorationStyle: 'double',
    textShadowColor: '#003384',
    color: '#003384',
    marginBottom: 20,
  },
  innerView: {
    height: eightyPercentHeight,
    backgroundColor: '#003384',
    width: '100%',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    padding: 20,
    marginTop: 20,
    paddingTop: 50,
    justifyContent: 'flex-end',
  },
  detailContainer: {
    marginVertical: 5,
  },
  detailLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    alignSelf: 'flex-start',
  },
  detailValue: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#003384',
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    lineHeight: 25,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  updateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    width: '48%',
  },
  updateText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff4d4d',
    paddingVertical: 15,
    borderRadius: 8,
    width: '48%',
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  editContainer: {
    marginBottom: 20,
  },
  input: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#003384',
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    lineHeight: 25,
  },
});

export default Profile;
