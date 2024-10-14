import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

const FaceBookSignIn = ({navigation}) => {
  const handleFaceBookSignIn = async () => {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccessToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      // Sign-in the user with the credential
      return auth().signInWithCredential(facebookCredential);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.emailButton}
        onPress={() => {
          handleFaceBookSignIn();
        }}>
        <Image
          source={require('../assets/images/facebook.png')}
          style={styles.FacebookImage}
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
  FacebookImage: {
    height: 30,
    width: 30,
  },
});

export default FaceBookSignIn;
