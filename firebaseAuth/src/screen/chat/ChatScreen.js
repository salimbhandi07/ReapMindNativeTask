import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import io from 'socket.io-client';
import axios from 'axios';
import UserAvatar from 'react-native-user-avatar';

const ChatScreen = ({route, navigation}) => {
  const {userId, userName} = route.params;
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);

  const socket = io('http://10.0.2.2:5000');
  const id = useSelector(state => state?.auth?.profileDetails?.user?._id);

  useEffect(() => {
    const room = [userId, id].sort().join('_');

    axios
      .get(`http://10.0.2.2:5000/api/v1/chat/messages/${room}`)
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });

    socket.emit('join_room', room);

    socket.on('receive_message', message => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    socket.on('message_deleted', messageId => {
      setMessages(prevMessages =>
        prevMessages.filter(msg => msg._id !== messageId),
      );
    });

    return () => {
      socket.off('receive_message');
      socket.off('message_deleted');
    };
  }, [userId, id]);

  const {deviceToken} = useSelector(state => state?.user);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        message: newMessage,
        senderId: id,
        receiverId: userId,
        deviceToken,
        sentAt: new Date().toISOString(),
      };

      socket.emit('send_message', message);
      setNewMessage('');
    }
  };

  const handleDeleteMessage = () => {
    if (selectedMessage && selectedMessage.senderId === id) {
      socket.emit('delete_message', selectedMessage._id);
      setIsShowModal(false);
    }
  };

  const handleOutsidePress = () => {
    setSelectedMessage(null);
    setIsShowModal(false);
    Keyboard.dismiss();
  };

  const renderMessage = ({item}) => {
    const isSentByCurrentUser = item.senderId === id;
    const isSelected = selectedMessage?._id === item._id;

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onLongPress={() => {
          setIsShowModal(true);
          setSelectedMessage(item);
        }}
        style={[
          styles.messageContainer,
          isSentByCurrentUser ? styles.sentMessage : styles.receivedMessage,
          isSelected && styles.selectedMessage,
        ]}>
        <Text style={[styles.messageText, isSelected && {color: '#fff'}]}>
          {item.message}
        </Text>
        <Text style={[styles.timeText, isSelected && {color: '#fff'}]}>
          {new Date(item.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
          <Icon name="arrow-back" size={24} color="#000" />
          <UserAvatar size={37} name={userName} />
          <Text style={styles.headerText}>{userName}</Text>
        </TouchableOpacity>
        {selectedMessage && selectedMessage.senderId === id && (
          <TouchableOpacity onPress={handleDeleteMessage}>
            <Icon name="trash" size={24} color="red" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={messages}
        keyExtractor={item => item._id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
        onTouchStart={handleOutsidePress} // Dismiss keyboard on touch start
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          style={styles.input}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messagesList: {
    flexGrow: 1,
  },
  messageContainer: {
    marginBottom: 12,
    padding: 10,
    borderRadius: 8,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  sentMessage: {
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#f0f0f0',
  },
  messageText: {
    fontSize: 16,
  },
  timeText: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  selectedMessage: {
    backgroundColor: '#948a8a',
  },
});

export default ChatScreen;
