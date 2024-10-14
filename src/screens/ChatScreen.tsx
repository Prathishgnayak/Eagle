import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import ChatHeader from '../components/ChatHeader';
import database from '@react-native-firebase/database';
import {useSelector} from 'react-redux';

const ChatScreen = ({route, navigation}) => {
  const {chatId, name2} = route.params;
  let {avatar} = route.params;
  !avatar ? (avatar = 'https://i.sstatic.net/l60Hf.png') : null;
  console.log(chatId);
  const uid = useSelector(state => state.auth.uid);
  const email = useSelector(state => state.auth.email);
  const name = useSelector(state => state.auth.name);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef();

  // Load messages from Firebase when component mounts
  useEffect(() => {
    const messagesRef = database().ref(`/chats/${chatId}/messages`); // Use chatId to access messages of the specific chat

    const onValueChange = snapshot => {
      const data = snapshot.val() || {};
      const messagesArray = Object.values(data);

      // Sort messages by timestamp
      messagesArray.sort((a, b) => a.timestamp - b.timestamp);

      setMessages(messagesArray);
    };

    messagesRef.on('value', onValueChange);

    return () => messagesRef.off('value', onValueChange); // Cleanup listener on unmount
  }, [chatId]); // Re-run effect when chatId changes

  // Format the current time for displaying message time
  const formatTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Handle sending of text messages
  const sendText = useCallback(() => {
    if (message.trim()) {
      const newMessage = {
        text: message,
        sender: email,
        username: name,
        time: formatTime(),
        timestamp: database.ServerValue.TIMESTAMP, // Firebase timestamp
      };

      // Save the message to Firebase under the correct chatId
      database()
        .ref(`/chats/${chatId}/messages`) // Ensure that the message is saved under the specific chat's ID
        .push(newMessage)
        .then(() => {
          setMessage(''); // Clear input field after sending
        })
        .catch(error => {
          console.error('Error sending message:', error);
        });
    }
  }, [message, chatId, email, name]);

  // Render each message in the chat
  const renderMessage = useCallback(
    ({item}) => {
      const isSentByUser = item.sender === email;

      return (
        <View
          style={[
            styles.messageContainer,
            isSentByUser ? styles.sentMessage : styles.receivedMessage,
          ]}>
          <Text style={styles.ChatText}>{item.text}</Text>
          {!isSentByUser && (
            <Text style={styles.messageTime}>{item.username}</Text>
          )}
          <Text style={styles.messageTime}>{item.time}</Text>
        </View>
      );
    },
    [email],
  );

  // Scroll to the bottom when new messages arrive
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  }, [messages]);

  return (
    <View style={styles.container}>
      <ChatHeader navigation={navigation} avatar={avatar} name={name2} />
      <View style={styles.ChatView}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderMessage}
          style={{paddingBottom: 20}} // Padding at the bottom for spacing
        />
      </View>
      <View style={styles.TextInputView}>
        <TextInput
          style={styles.TextInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message..."
          placeholderTextColor="gray"
          autoFocus
          onSubmitEditing={sendText} // Send message on enter
        />
        <TouchableOpacity
          onPress={sendText}
          accessibilityLabel="Send Message"
          accessibilityRole="button">
          <Image
            source={require('../assets/images/send_message.png')}
            style={styles.send_message_Image}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  ChatView: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  TextInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  TextInput: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginRight: 10,
    fontSize: 16,
    color: '#333',
  },
  send_message_Image: {
    width: 30,
    height: 30,
    tintColor: '#007AFF',
  },
  messageContainer: {
    marginBottom: 10,
    maxWidth: '80%',
    padding: 10,
    borderRadius: 20,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    borderBottomRightRadius: 0,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 0,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  ChatText: {
    fontSize: 16,
    color: '#333',
  },
  messageTime: {
    fontSize: 12,
    color: 'gray',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
});
