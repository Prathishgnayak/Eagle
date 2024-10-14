import React, {useState, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import database from '@react-native-firebase/database';
import {useSelector} from 'react-redux';

const AddScreen = ({navigation}) => {
  const email = useSelector(state => state.auth.email);
  const [users, setUsers] = useState([]); // List of all users fetched from Firebase
  const [group, setGroup] = useState([]); // Random group of users
  const [groupCreated, setGroupCreated] = useState(false); // Toggle create group button and chat button

  // Function to fetch user list from Firebase
  const fetchUsers = async () => {
    try {
      const snapshot = await database().ref('/users').once('value');
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
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to create a random group of 4 users
  // const createRandomGroup = () => {
  //   const shuffledUsers = users.sort(() => 0.5 - Math.random());
  //   const randomGroup = shuffledUsers.slice(0, 3); // Select random 4 users
  //   setGroup(randomGroup);
  //   setGroupCreated(true);
  // };

  const createRandomGroup = () => {
    // Filter out the current user's email from the user list
    const filteredUsers = users.filter(user => user.email !== email);

    // Shuffle the filtered user list and select 3 random users
    const shuffledUsers = filteredUsers.sort(() => 0.5 - Math.random());
    const randomGroup = shuffledUsers.slice(0, 3); // Select 3 users

    setGroup(randomGroup);
    setGroupCreated(true);
  };

  const handleOpenSingleChat = (user2email, avatar, name) => {
    const chatId = createChatId(email, user2email);

    console.log(email, chatId);

    // Navigate to ChatScreen with the correct name and parameters
    navigation.navigate('Chat', {chatId: chatId, avatar: avatar, name2: name});
  };

  const createChatId = (user1Email, user2Email) => {
    console.log('Useremail' + user1Email);
    // Sort emails alphabetically and replace disallowed characters
    const sanitizedEmail1 = user1Email.replace(/\./g, ','); // Replaces '.' with ','
    const sanitizedEmail2 = user2Email.replace(/\./g, ',');
    console.log('sanitizedEmails  :  ' + sanitizedEmail1, sanitizedEmail2);
    // Sort the emails alphabetically to ensure consistent chatId
    const sortedEmails = [sanitizedEmail1, sanitizedEmail2].sort();
    console.log('Sorted Emails  ' + sortedEmails);
    // Join the sorted and sanitized emails to create the chatId
    const chatId = `${sortedEmails[0]}_${sortedEmails[1]}`;

    return chatId;
  };

  const createGroupChatId = (groupMembers, currentUserEmail) => {
    // Add current user's email to the list of group members
    const emails = [
      ...groupMembers.map(member => member.email),
      currentUserEmail,
    ];

    // Sanitize each email by replacing disallowed characters
    const sanitizedEmails = emails.map(email => email.replace(/\./g, ','));

    // Sort the emails alphabetically to ensure a consistent chatId
    const sortedEmails = sanitizedEmails.sort();

    // Join the sorted emails with an underscore to create the group chatId
    const groupChatId = sortedEmails.join('_');

    return groupChatId;
  };

  return (
    <View style={styles.View}>
      {/* FlatList for displaying users */}
      <FlatList
        data={groupCreated ? group : users} // Show either the full user list or just the group
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              handleOpenSingleChat(item.email, item.avatar, item.name)
            }>
            <View style={styles.userCard}>
              <Image source={{uri: item.avatar}} style={styles.avatar} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Create group button (only visible before a group is created) */}
      {!groupCreated && (
        <TouchableOpacity
          style={styles.createButton}
          onPress={createRandomGroup}>
          <Text style={styles.buttonText}>Create a Random Group</Text>
        </TouchableOpacity>
      )}

      {/* Start chat button (only visible after group is created) */}
      {groupCreated && (
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => {
          
            let groupName = '6';
            navigation.navigate('Chat', {chatId: groupName});
            setGroup([]); // Clear group after navigating to chat
            setGroupCreated(false); // Reset group creation flag
          }}>
          <Text style={styles.buttonText}>Start Chat</Text>
        </TouchableOpacity>
      )}
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
