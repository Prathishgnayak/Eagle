import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Back from './Back';

const ChatHeader = ({navigation, avatar, name}) => {
  return (
    <View style={styles.View}>
      <View style={styles.CardView}>
        <Back navigation={navigation} />
        <Image
          source={{uri: `${avatar}`}} // Profile image
          style={styles.BlackImage}
        />
        <View>
          <Text style={styles.HeaderText}>{name}</Text>
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
