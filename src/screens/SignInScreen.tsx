import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import auth from '@react-native-firebase/auth'; // Correct import for Firebase Auth
import AuthForm from '../components/AuthForm';
import {useDispatch, useSelector} from 'react-redux';
import {
  setEmail,
  setIdToken,
  setName,
  setPhoneNumber,
  setPhoto,
  setUid,
} from '../redux/slices/AuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {triggerLocalNotification} from '../components/Notification';

const SignInScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const email = useSelector(state => state.auth.email);
  const password = useSelector(state => state.auth.password);

  const handleSignIn = async () => {
    // await triggerLocalNotification();
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );

      // Get user ID and dispatch it
      const uid = userCredential.user.uid;
      dispatch(setUid(uid));

      // Get the ID token
      const idToken = await userCredential.user.getIdToken();

      // Use the ID token (e.g., dispatch or store it)
      // console.log(idToken);
      dispatch(setIdToken(idToken));
      await AsyncStorage.setItem('token', idToken);

      // console.log('Logged In with Email: ' + email);
      //navigation.navigate('OTP');
      navigation.navigate('OTP');

      // Optionally navigate to another screen after successful login
    } catch (error) {
      console.error(error);
      Alert.alert('Login Error', error.message); // Show user-friendly error message
    }
  };
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        const uemail = await AsyncStorage.getItem('email');
        const phoneNumber = await AsyncStorage.getItem('phoneNumber');
        const photo = await AsyncStorage.getItem('photo');
        const uid = await AsyncStorage.getItem('uid');
        const name = await AsyncStorage.getItem('name');
        const status = await AsyncStorage.getItem('status');
        console.log('Email : ' + uemail);
        console.log('phoneNumber : ' + phoneNumber);
        console.log('photo : ' + photo);
        console.log('uid : ' + uid);
        console.log('name : ' + name);
        console.log('status : ' + status);
        dispatch(setEmail(uemail));
        dispatch(setUid(uid));
        dispatch(setPhoto(photo));
        dispatch(setPhoneNumber(phoneNumber));
        dispatch(setName(name));

        if (token) {
          navigation.navigate('MainFlow'); // Navigate to your main screen if the token exists
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };

    checkToken(); // Call the async function inside useEffect
  }, [navigation]);
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
