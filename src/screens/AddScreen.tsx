import React, { useState, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import database from '@react-native-firebase/database';
import { useSelector } from 'react-redux';
import UserPresence from '../components/UserPresence';
import ViewProfileImageModal from '../components/ViewProfileImageModal';

const AddScreen = ({ navigation }) => {
  const email = useSelector(state => state.auth.email);
  const currentUserId = useSelector(state => state.auth.uid);
  const [users, setUsers] = useState([]); // List of all users fetched from Firebase
  const [group, setGroup] = useState([]); // Random group of users
  const [groupCreated, setGroupCreated] = useState(false); // Toggle create group button and chat button
  const [isModalVisible, setModalVisible] = useState(false); // Control modal visibility
  const [selectedImage, setSelectedImage] = useState(null); // Store the selected image URL for the modal

  // Function to fetch user list from Firebase
  const fetchUsers = async () => {
    try {
      const databaseRef = await database().ref('/users');
      databaseRef.on('value', snapshot => {
        const usersData = snapshot.val();

        // Map the data to extract user id, name, email, and photo
        const userList = Object.keys(usersData).map(userId => {
          const user = usersData[userId];
          return {
            id: userId,
            name: user.name || 'Anonymous',
            email: user.email || 'No email',
            avatar: user.photo || 'https://i.sstatic.net/l60Hf.png',
          };
        });

        setUsers(userList);
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createRandomGroup = () => {
    const filteredUsers = users.filter(user => user.email !== email);
    const shuffledUsers = filteredUsers.sort(() => 0.5 - Math.random());
    const randomGroup = shuffledUsers.slice(0, 3);
    setGroup(randomGroup);
    setGroupCreated(true);
  };

  const handleOpenSingleChat = (user2email, avatar, name, id) => {
    const chatId = createChatId(email, user2email);
    navigation.navigate('Chat', {
      chatId: chatId,
      avatar: avatar,
      name2: name,
      userId: id,
    });
  };

  const createChatId = (user1Email, user2Email) => {
    const sanitizedEmail1 = user1Email.replace(/\./g, ',');
    const sanitizedEmail2 = user2Email.replace(/\./g, ',');
    const sortedEmails = [sanitizedEmail1, sanitizedEmail2].sort();
    return `${sortedEmails[0]}_${sortedEmails[1]}`;
  };

  const handleOpenGroupChat = (group, email) => {
    let chatId = createGroupChatId(group, email);
    navigation.navigate('Chat', { chatId: chatId });
    setGroup([]);
    setGroupCreated(false);
  };

  const createGroupChatId = (groupMembers, currentUserEmail) => {
    const emails = [
      ...groupMembers.map(member => member.email),
      currentUserEmail,
    ];
    const sanitizedEmails = emails.map(email => email.replace(/\./g, ','));
    const sortedEmails = sanitizedEmails.sort();
    return sortedEmails.join('_');
  };

  // Toggle modal visibility and set the selected image
  const toggleModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.View}>
      <UserPresence currentUserId={currentUserId} />
      <FlatList
        data={groupCreated ? group : users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              handleOpenSingleChat(item.email, item.avatar, item.name, item.id)
            }>
            <View style={styles.userCard}>
              <TouchableOpacity
                onPress={() => toggleModal(item.avatar)}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
              </TouchableOpacity>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {!groupCreated && (
        <TouchableOpacity
          style={styles.createButton}
          onPress={createRandomGroup}>
          <Text style={styles.buttonText}>Create a Random Group</Text>
        </TouchableOpacity>
      )}

      {groupCreated && (
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => handleOpenGroupChat(group, email)}>
          <Text style={styles.buttonText}>Start Chat</Text>
        </TouchableOpacity>
      )}


      <ViewProfileImageModal selectedImage={selectedImage} isVisible={isModalVisible} onClose={()=>toggleModal(null)}/>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  View: {
    flex: 1,
    padding: 16,
    backgroundColor: '#cef8f0',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  userEmail: {
    fontSize: 14,
    color: '#555',
  },
  createButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center',
    width: '70%',
  },
  chatButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    alignSelf: 'center',
    width: '70%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddScreen;
