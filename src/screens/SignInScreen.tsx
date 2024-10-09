import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import auth from '@react-native-firebase/auth'; // Correct import for Firebase Auth
import AuthForm from '../components/AuthForm';
import {useDispatch, useSelector} from 'react-redux';
import {setUid} from '../redux/slices/AuthSlice';

const SignInScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const email = useSelector(state => state.auth.email);
  const password = useSelector(state => state.auth.password);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          // User registered successfully
          const uid = userCredential.user.uid;
          dispatch(setUid(uid));
          console.log(userCredential);
          console.log('User UID: ', uid);
        })
        .catch(error => {
          console.error(error);
        });
      console.log('Logged In with Email: ' + email);
      navigation.navigate('OTP');

      // Optionally navigate to another screen after successful login
    } catch (error) {
      console.error(error);
      Alert.alert('Login Error', error.message); // Show user-friendly error message
    }
  };

  return (
    <View style={styles.View}>
      <AuthForm
        title="Sign In"
        bottomText="Don't Have an Account.? "
        navigation={navigation}
        navPath="SignUp"
        onPress={handleSignIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    flex: 1,
   backgroundColor: '#cef8f0',
    justifyContent: 'center', // Center content vertically
    padding: 20, // Add padding
  },
});

export default SignInScreen;
