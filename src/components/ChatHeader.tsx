import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Back from './Back';

const ChatHeader = ({navigation}) => {
  return (
    <View style={styles.View}>
      <View style={styles.CardView}>
        <Back navigation={navigation} />
        <Image
          source={require('../assets/images/black_image.png')} // Profile image
          style={styles.BlackImage}
        />
        <View>
          <Text style={styles.HeaderText}>Group Name</Text>
          <Text style={styles.SubHeaderText}>Online</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    height: 70,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  CardView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  BlackImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  HeaderText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  SubHeaderText: {
    color: 'black',
    fontSize: 14,
  },
});

export default ChatHeader;
