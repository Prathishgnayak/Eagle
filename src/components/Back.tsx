import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Back = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.BackImageButton}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image
          source={require('../assets/images/back.png')} // Back arrow
          style={styles.BackImage}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Back;

const styles = StyleSheet.create({
  BackImage: {
    height: 24,
    width: 24,
    tintColor: 'black', // White color for the back button
  },
  BackImageButton: {
    marginRight: 15,
  },
});
