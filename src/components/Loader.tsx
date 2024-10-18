import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window');

const Loader = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/lottie/Loader.json')}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   // height:20
  },
  animation: {
    width: width * 0.4, // Default size for the loader, can be adjusted
    height: height * 0.4, // Default size for the loader, can be adjusted
  },
});

export default Loader;
