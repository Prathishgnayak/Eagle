import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const HomeScreen = () => {
  return (
    <View>
      <Text style={styles.Text}>HomeScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  View: {},
  Text: {
    color: 'black',
  },
});

export default HomeScreen;
