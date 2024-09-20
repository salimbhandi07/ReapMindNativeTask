import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import io from 'socket.io-client';
import axios from 'axios';
import UserAvatar from 'react-native-user-avatar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';

const ChatScreen = ({route, navigation}) => {
  const {userId, userName} = route.params;
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
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
  const [isTextInputActive, setIsTextInputActive] = useState(false);
  const textInputRef = useRef(null);

  const showKeyBoard = () => {
    console.log('IIIIIIIIIIIi', textInputRef.current);

    if (textInputRef.current) {
      textInputRef.current.focus(); // Focus the TextInput to open the keyboard
    }
    // setShowEmojiPicker(false); // Optionally hide the emoji picker
  };

  const showEmoji = () => {
    Keyboard.dismiss();
    setShowEmojiPicker(!showEmojiPicker); // Toggle the emoji picker
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
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
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

        <View style={{flex: showEmojiPicker ? 0.9 : 1}}>
          <FlatList
            data={messages}
            keyExtractor={item => item._id}
            renderItem={renderMessage}
            contentContainerStyle={styles.messagesList}
            showsVerticalScrollIndicator={false}
            onTouchStart={handleOutsidePress}
            onFocus={() => setIsTextInputActive(true)} // Focus event
            onBlur={() => setIsTextInputActive(true)} // Blur event
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            ref={textInputRef}
            value={newMessage}
            onChangeText={setNewMessage}
            style={styles.input}
            placeholder="Type your message..."
            multiline
            textAlignVertical="top"
          />

          {showEmojiPicker ? (
            <TouchableOpacity onPress={showKeyBoard} style={styles.emojiButton}>
              <MaterialCommunityIcons
                name="keyboard-outline"
                size={28}
                color="#000"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={showEmoji} style={styles.emojiButton}>
              <Icon name="happy-outline" size={24} color="#000" />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <MaterialIcons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {showEmojiPicker && (
          <View style={styles.emojiPickerContainer}>
            <EmojiSelector
              onEmojiSelected={emoji => setNewMessage(prev => prev + emoji)}
              category={Categories.ALL}
              showSearchBar={false}
              columns={8}
              style={styles.emojiPicker}
            />
          </View>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
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
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
    position: 'relative',
  },
  input: {
    flex: 1,
    paddingVertical: 9,
    paddingHorizontal: 40,
    backgroundColor: '#fff',
    borderRadius: 25,
    fontSize: 16,
    maxHeight: 170,
  },
  emojiButton: {
    position: 'absolute',
    left: 25,
    top: '50%',
    transform: [{translateY: -6}],
  },
  sendButton: {
    backgroundColor: '#25D366',
    padding: 10,
    borderRadius: 50,
    marginLeft: 10,
  },
  emojiPickerContainer: {
    height: 250,
  },
  emojiPicker: {
    flex: 1,
  },
});

export default ChatScreen;
