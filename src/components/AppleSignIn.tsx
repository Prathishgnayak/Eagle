import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const AppleSignIn = ({navigation}) => {
  const handleAppleSignIn = () => {
    return null;
  };
  return (
    <View>
      <TouchableOpacity
        style={styles.emailButton}
        onPress={() => {
          handleAppleSignIn();
        }}>
        <Image
          source={require('../assets/images/apple.png')}
          style={styles.AppleImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  emailButton: {
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius: 50,
    elevation: 10,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  GoogleImage: {
    height: 30,
    width: 30,
  },
  FacebookImage: {
    height: 30,
    width: 30,
  },

  AppleImage: {
    height: 30,
    width: 30,
    top: -2,
  },
});

export default AppleSignIn;
