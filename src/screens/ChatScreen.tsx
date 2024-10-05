import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import ChatHeader from '../components/ChatHeader';
import database from '@react-native-firebase/database';
import {useSelector} from 'react-redux';

const ChatScreen = ({navigation}) => {
  const uid = useSelector(state => state.auth.uid);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isSent, setIsSent] = useState(true);

  const sendText = () => {
    if (message.trim()) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      setMessages([
        ...messages,
        {text: message, sent: isSent, time: currentTime},
      ]);
      setMessage('');
      setIsSent(!isSent);
    }
    database()
      .ref(`/users/${uid}`)
      .set(messages)
      .then(() => console.log('Data set.'));
  };

  return (
    <View style={styles.View}>
      <ChatHeader navigation={navigation} />
      {/* <Image
        source={require('../assets/images/black_image.png')} // WhatsApp-like background
        style={styles.backgroundImage}
      /> */}
      <View style={styles.ChatView}>
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View
              style={[
                styles.messageContainer,
                item.sent ? styles.sentMessage : styles.receivedMessage,
              ]}>
              <Text
                style={[
                  styles.ChatText,
                  item.sent ? styles.ChatSenderText : styles.ChatReceiverText,
                ]}>
                {item.text}
              </Text>
              <Text style={styles.messageTime}>{item.time}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.TextInputView}>
        <TextInput
          style={styles.TextInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor="gray"
        />
        <TouchableOpacity onPress={sendText}>
          <Image
            source={require('../assets/images/send_message.png')} // WhatsApp-style send icon
            style={styles.send_message_Image}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  View: {flex: 1, backgroundColor: '#d7f9f3'},
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // WhatsApp-like background image
  },
  TextInputView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
    elevation: 2,
  },
  TextInput: {
    borderRadius: 25,
    backgroundColor: '#ffffff',
    flex: 1,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
    color: 'black',
  },
  send_message_Image: {
    height: 40,
    width: 40,
    tintColor: '#34B7F1', // WhatsApp blue for the send icon
  },
  ChatView: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 5,
    padding: 10,
    borderRadius: 20,
    elevation: 1,
  },
  sentMessage: {
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
  },
  ChatText: {
    fontSize: 16,
  },
  ChatSenderText: {
    color: 'black',
  },
  ChatReceiverText: {
    color: 'black',
  },
  messageTime: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
});
