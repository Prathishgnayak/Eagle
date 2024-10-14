import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import AuthForm from '../components/AuthForm';
import {useDispatch, useSelector} from 'react-redux';
import {setIdToken, setName, setUid} from '../redux/slices/AuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const email = useSelector(state => state.auth.email);
  const password = useSelector(state => state.auth.password);
  const name = useSelector(state => state.auth.name);

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      const uid = userCredential.user.uid;
      const idToken = await userCredential.user.getIdToken();
      console.log('idtoken : ' + idToken);
      dispatch(setUid(uid));
      dispatch(setIdToken(idToken));
      dispatch(setName(name));
      await AsyncStorage.setItem('token', idToken);
      console.log('User UID: ', uid);

      console.log('created a user with Email: ' + email);
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
        title="Sign Up"
        bottomText="Already Have an Account.? "
        navigation={navigation}
        navPath="SignIn"
        onPress={handleSignUp}
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

export default SignUpScreen;
