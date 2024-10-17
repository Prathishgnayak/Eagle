import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect, useRef, useCallback} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ChatHeader from '../components/ChatHeader';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import {useSelector} from 'react-redux';
import {check} from 'react-native-permissions';

const ChatScreen = ({route, navigation}) => {
  const {chatId, name2, userId} = route.params;
  console.log('UserId from Chat Screen : ' + userId);
  let {avatar} = route.params;
  !avatar ? (avatar = 'https://i.sstatic.net/l60Hf.png') : null;

  const uid = useSelector(state => state.auth.uid);
  const email = useSelector(state => state.auth.email);
  const name = useSelector(state => state.auth.name);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef();

  // Status for camera and gallery permissions
  const status = async () => {
    const cameraStatus = await check('android.permission.CAMERA');
    const galleryStatus = await check(
      'android.permission.READ_EXTERNAL_STORAGE',
    );
  };

  // Load messages from Firebase when component mounts
  useEffect(() => {
    status();
    const messagesRef = database().ref(`/chats/${chatId}/messages`);

    const onValueChange = snapshot => {
      const data = snapshot.val() || {};
      const messagesArray = Object.values(data);

      // Sort messages by timestamp
      messagesArray.sort((a, b) => a.timestamp - b.timestamp);
      setMessages(messagesArray);
    };

    messagesRef.on('value', onValueChange);

    return () => messagesRef.off('value', onValueChange); // Cleanup listener
  }, [chatId]);

  // Function to upload image to Firebase Storage
  const uploadImageToStorage = async imageUri => {
    const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    const storageRef = storage().ref(`/chats/${chatId}/images/${filename}`);
    const task = storageRef.putFile(imageUri);

    try {
      await task;
      const downloadURL = await storageRef.getDownloadURL();
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  // Handle sending of image message
  const sendImageMessage = async imageUri => {
    const imageUrl = await uploadImageToStorage(imageUri);
    if (imageUrl) {
      const newMessage = {
        imageUrl, // Image URL stored instead of text
        sender: email,
        username: name,
        time: formatTime(),
        timestamp: database.ServerValue.TIMESTAMP,
      };

      database()
        .ref(`/chats/${chatId}/messages`)
        .push(newMessage)
        .catch(error => {
          console.error('Error sending image message:', error);
        });
    }
  };

  // Capture image using camera
  const handleCamera = async () => {
    launchCamera(
      {mediaType: 'photo', cameraType: 'back', quality: 0.8},
      response => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.error('Camera error:', response.errorMessage);
        } else {
          const imageUri = response.assets[0].uri;
          sendImageMessage(imageUri);
        }
      },
    );
  };

  // Pick image from gallery
  const openGallery = async () => {
    launchImageLibrary(
      {mediaType: 'photo', selectionLimit: 1, quality: 0.8},
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.error('Gallery error:', response.errorMessage);
        } else {
          const imageUri = response.assets[0].uri;
          sendImageMessage(imageUri);
        }
      },
    );
  };

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
        timestamp: database.ServerValue.TIMESTAMP,
        isSeen: false,
      };

      database()
        .ref(`/chats/${chatId}/messages`)
        .push(newMessage)
        .then(() => setMessage('')) // Clear input after sending
        .catch(error => {
          console.error('Error sending message:', error);
        });
    }
  }, [message, chatId, email, name]);

  // Render each message (text or image)
  const renderMessage = useCallback(
    ({item}) => {
      const isSentByUser = item.sender === email;
      return (
        <View
          style={[
            styles.messageContainer,
            isSentByUser ? styles.sentMessage : styles.receivedMessage,
          ]}>
          {item.imageUrl ? (
            <Image source={{uri: item.imageUrl}} style={styles.chatImage} />
          ) : (
            <Text style={styles.ChatText}>{item.text}</Text>
          )}
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
      <ChatHeader
        navigation={navigation}
        avatar={avatar}
        name={name2}
        uid={userId}
      />
      <View style={styles.ChatView}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderMessage}
          style={{paddingBottom: 20}}
        />
      </View>
      <View style={styles.MessageWritingView}>
        <View style={styles.TextInputView}>
          <TextInput
            style={styles.TextInput}
            value={message}
            onChangeText={setMessage}
            placeholder="Type your message..."
            placeholderTextColor="gray"
            autoFocus
            multiline
          />
          <TouchableOpacity onPress={handleCamera}>
            <Image
              source={require('../assets/images/camera.png')}
              style={styles.camera_Image}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={openGallery}>
            <Image
              source={require('../assets/images/attachment.png')}
              style={styles.attachment_Image}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={sendText} style={styles.sendButton}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cef8f0',
  },
  ChatView: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  TextInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    justifyContent: 'center',
  },
  MessageWritingView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  TextInput: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff',
    marginRight: 10,
    fontSize: 16,
    color: '#333',
    maxHeight: 150,
  },
  camera_Image: {
    width: 40,
    height: 40,
    tintColor: '#007AFF',
  },
  attachment_Image: {
    width: 35,
    height: 35,
    tintColor: '#007AFF',
    marginLeft: 7,
    marginRight: 7,
    alignSelf: 'center',
  },
  send_message_Image: {
    width: 35,
    height: 35,
    tintColor: '#007AFF',
    margin: 10,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
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
  chatImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});
