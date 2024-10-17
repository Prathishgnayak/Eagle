import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken, Profile} from 'react-native-fbsdk-next';
import {useDispatch, useSelector} from 'react-redux';
import {
  setEmail,
  setIdToken,
  setName,
  setPhoto,
  setUid,
} from '../redux/slices/AuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInwithFacebook = ({navigation}) => {
  const dispatch = useDispatch();
  const email = useSelector(state => state.auth.email);

  //FaceBook Login
  const onFacebookButtonPress = async () => {
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
      const idToken = await facebookCredential.token;
      dispatch(setIdToken(idToken));

      await AsyncStorage.setItem('token', idToken);

      // Sign-in the user with the credential

      const userCredential = await auth().signInWithCredential(
        facebookCredential,
      );
      const profile = await Profile.getCurrentProfile();
      const name = profile?.name;
      dispatch(setName(name));

      dispatch(setEmail(userCredential.user.email));
      dispatch(setPhoto(userCredential.user.photoURL));
      dispatch(setUid(userCredential.user.uid));

      navigation.navigate('OTP');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.emailButton}
        onPress={() => {
          onFacebookButtonPress();
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
  FacebookImage: {
    height: 30,
    width: 30,
  },
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
});

export default SignInwithFacebook;
