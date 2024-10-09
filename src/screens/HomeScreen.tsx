import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import HomeHeader from '../components/HomeHeader';

const HomeScreen = ({navigation}) => {
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

  return (
    <View style={styles.View}>
      <HomeHeader navigation={navigation} />
      <Text style={styles.Text}>HomeScreen</Text>
      <View>
        <Text style={styles.Text}>Some Text</Text>
      </View>
      <FlatList
        data={userList}
        keyExtractor={item => item.id.toString()}
        horizontal
        renderItem={({item}) => {
          return (
            <View>
              <View style={styles.CardView}>
                <TouchableOpacity>
                  {/*<Image source={{uri: item.avatar}} style={styles.avatar} />*/}
                  <Text style={styles.Text}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      <Text style={styles.Text}>Hello this is another one</Text>
      <FlatList
        data={userList}
        keyExtractor={item => item.id.toString()}
        horizontal
        renderItem={({item}) => {
          return (
            <View>
              <View style={styles.CardView}>
                <TouchableOpacity>
                  {/*<Image source={{uri: item.avatar}} style={styles.avatar} />*/}
                  <Text style={styles.Text}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    flex: 1,
    backgroundColor: '#cef8f0',
  },
  CardView: {
    margin: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 20,
    width: 300,
    height: 300,
    elevation: 10,
    //justifyContent: 'center',
  },
  Image: {height: 10, width: 10},
  avatar: {
    width: 270,
    height: 270,
    borderRadius: 5,
    alignSelf: 'center',
  },
  Text: {
    color: 'black',
  },
});

export default HomeScreen;
