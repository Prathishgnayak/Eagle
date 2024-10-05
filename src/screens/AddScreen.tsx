import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

const AddScreen = ({navigation}) => {
  // Initial list of users (you could fetch this from a backend)
  const userList = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      id: 3,
      name: 'Sam Johnson',
      email: 'sam@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      id: 4,
      name: 'Sara Adams',
      email: 'sara@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      id: 5,
      name: 'Tom Lee',
      email: 'tom@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
      id: 6,
      name: 'Emily Clark',
      email: 'emily@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      id: 7,
      name: 'Mark Davis',
      email: 'mark@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
    {
      id: 8,
      name: 'Olivia Brown',
      email: 'olivia@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
  ];

  const [users, setUsers] = useState(userList); // List of all users
  const [group, setGroup] = useState([]); // Random group of users
  const [groupCreated, setGroupCreated] = useState(false); // Toggle create group button and chat button

  // Function to create a random group
  const createRandomGroup = () => {
    const shuffledUsers = userList.sort(() => 0.5 - Math.random());
    const randomGroup = shuffledUsers.slice(0, 4); // Select random 4 users
    setGroup(randomGroup);
    setGroupCreated(true); // Hide "Create" button and show "Start Chat"
  };

  return (
    <View style={styles.container}>
      {/* FlatList for displaying users */}
      <FlatList
        data={groupCreated ? group : users} // Show either the full user list or just the group
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.userCard}>
            <Image source={{uri: item.avatar}} style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userEmail}>{item.email}</Text>
            </View>
          </View>
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
            navigation.navigate('ChatFlow');
            setGroup([]), setGroupCreated(false);
          }}>
          <Text style={styles.buttonText}>Start Chat</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 0,
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
