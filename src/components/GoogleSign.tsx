import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';

const GoogleSign = ({navigation}) => {
  const handleGoogleSignIn = async () => {
    try {
      // Ensure any previous sign-in is cleared before attempting a new one
      // await GoogleSignin.signOut();
      // await auth().signOut();

      // Check if the device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      // Get the user's ID token
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo);

      const idToken = userInfo.idToken || userInfo.data.idToken;
      console.log(idToken);

      // if (!idToken) {
      //   throw new Error('Google Sign-In failed to retrieve ID token.');
      // }

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign in the user with the credential
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      console.log('User signed in successfully:', userCredential);

      navigation.navigate('OTP');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '851671427134-0ok70ugqueior6e389lq0s61kq9orhqe.apps.googleusercontent.com',
    });
  }, []);
  return (
    <View>
      <TouchableOpacity
        style={styles.emailButton}
        onPress={() => {
          handleGoogleSignIn();
        }}>
        <Image
          source={require('../assets/images/google.png')}
          style={styles.GoogleImage}
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
});

export default GoogleSign;
