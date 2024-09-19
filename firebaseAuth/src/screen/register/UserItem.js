import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import UserAvatar from 'react-native-user-avatar';
const UserItem = ({item}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Chat', {
      userId: item._id,
      userName: item.name,
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.userCard}>
      <View style={styles.avatarContainer}>
        <UserAvatar size={47} name={item.name} />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        {/* <Text style={styles.userPhone}>{item.phoneNumber}</Text> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#ffffff',
    // borderRadius: 10,
    // marginBottom: 12,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    // shadowRadius: 6,
    // elevation: 3,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  userEmail: {
    fontSize: 16,
    color: '#666666',
    marginVertical: 2,
  },
  userPhone: {
    fontSize: 14,
    color: '#999999',
  },
});

export default UserItem;
