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
      //name: 'John Doe',
      //email: 'john@example.com',
      avatar:
        'https://socializing123.s3.ap-south-1.amazonaws.com/Image_20241004_092402_832-copy.jpeg',
    },
    {
      id: 2,
      //name: 'Jane Smith',
      //email: 'jane@example.com',
      avatar:
        'https://socializing123.s3.ap-south-1.amazonaws.com/Image_20241004_125858_305-copy.jpeg',
    },
    {
      id: 3,
      //name: 'Sam Johnson',
      //email: 'sam@example.com',
      avatar:
        'https://socializing123.s3.ap-south-1.amazonaws.com/Image_20241007_181113_356.jpeg',
    },
    {
      id: 4,
      //name: 'Sara Adams',
      //email: 'sara@example.com',
      avatar:
        'https://socializing123.s3.ap-south-1.amazonaws.com/Image_20241007_181113_356.jpeg',
    },
    {
      id: 5,
      //name: 'Tom Lee',
      //email: 'tom@example.com',
      avatar:
        'https://socializing123.s3.ap-south-1.amazonaws.com/Image_20241008_163733_086+-+copy.jpeg',
    },
    {
      id: 6,
      //name: 'Emily Clark',
      //email: 'emily@example.com',
      avatar:
        'https://socializing123.s3.ap-south-1.amazonaws.com/IMG_6973+-+copy.jpg',
    },
    {
      id: 7,
      //name: 'Mark Davis',
      //email: 'mark@example.com',
      avatar:
        'https://socializing123.s3.ap-south-1.amazonaws.com/IMG-20241003-WA0001-+copy.jpg',
    },
    {
      id: 8,
      //name: 'Olivia Brown',
      //email: 'olivia@example.com',
      avatar:
        'https://socializing123.s3.ap-south-1.amazonaws.com/IMG-20241004-WA0013+-copy.jpg',
    },
    {
      id: 9,
      //name: 'Olivia Brown',
      //email: 'olivia@example.com',
      avatar:
        'https://socializing123.s3.ap-south-1.amazonaws.com/IMG-20241005-WA0008-copy.jpg',
    },
    {
      id: 10,
      //name: 'Olivia Brown',
      //email: 'olivia@example.com',
      avatar:
        'https://socializing123.s3.ap-south-1.amazonaws.com/IMG-20241004-WA0013+-copy.jpg',
    },
    {
      id: 11,
      //name: 'Olivia Brown',
      //email: 'olivia@example.com',
      avatar:
        'https://socializing123.s3.ap-south-1.amazonaws.com/IMG-20241007-WA0012+-copy+2.jpg',
    },
    {
      id: 12,
      //name: 'Olivia Brown',
      //email: 'olivia@example.com',
      avatar:
        'https://socializing123.s3.ap-south-1.amazonaws.com/Screenshot+from+2024-10-10+10-21-24.png',
    },
    {
      id: 13,
      //name: 'Olivia Brown',
      //email: 'olivia@example.com',
      avatar:
        'https://socializing123.s3.ap-south-1.amazonaws.com/un//named.png',
    },
    {
      id: 14,
      //name: 'Olivia Brown',
      //email: 'olivia@example.com',
      avatar:
        'https://socializing123.s3.ap-south-1.amazonaws.com/un//named.png',
    },
    {
      id: 15,
      //name: 'Olivia Brown',
      //email: 'olivia@example.com',
      avatar: 'https://socializing123.s3.ap-south-1.amazonaws.com/zorba.png',
    },
  ];

  return (
    <View style={styles.View}>
      <HomeHeader navigation={navigation} />
      <Text style={styles.Text}>HomeScreen</Text>
      <View>
        <Text style={styles.titleText}>Best Shots so far</Text>
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
                  <Image source={{uri: item.avatar}} style={styles.avatar} />
                  {/* <Text style={styles.Text}>{item.name}</Text> */}
                  <Text style={styles.Text}>{item.id}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      <Text style={styles.titleText}>Up Coming Events</Text>
      <FlatList
        data={userList}
        keyExtractor={item => item.id.toString()}
        horizontal
        renderItem={({item}) => {
          return (
            <View>
              <View style={styles.CardView}>
                <TouchableOpacity>
                  <Image source={{uri: item.avatar}} style={styles.avatar} />
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
    justifyContent: 'center',
  },
  Image: {height: 10, width: 10},
  avatar: {
    width: 300,
    height: 300,
    borderRadius: 5,
    alignSelf: 'center',
  },
  Text: {
    color: 'black',
  },
  titleText:{
    color:'black',
    fontSize:20,
    alignSelf:'center',
    padding:20
  }
});

export default HomeScreen;
