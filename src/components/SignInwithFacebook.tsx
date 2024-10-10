import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken, Profile} from 'react-native-fbsdk-next';
import {useDispatch, useSelector} from 'react-redux';
import {setEmail, setPhoto} from '../redux/slices/AuthSlice';

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
      console.log(1);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }
      console.log(2);
      // Once signed in, get the users AccessToken
      const data = await AccessToken.getCurrentAccessToken();
      console.log(3);
      if (!data) {
        throw 'Something went wrong obtaining access token';
      }
      console.log(4);
      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      console.log(facebookCredential);
      console.log(5);

      // Sign-in the user with the credential

      const userCredential = await auth().signInWithCredential(
        facebookCredential,
      );
      console.log(6);
      const profile = await Profile.getCurrentProfile();
      console.log(7);
      console.log('UserCredential:', userCredential);
      console.log(userCredential.user.email);
      dispatch(setEmail(userCredential.user.email));
      dispatch(setPhoto(userCredential.user.photoURL));
      console.log('Profile:', profile);

      navigation.navigate('OTP');
      console.log(8);
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
