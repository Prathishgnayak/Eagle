import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import AuthForm from '../components/AuthForm';
import {useSelector} from 'react-redux';

const SignUpScreen = ({navigation}) => {
  const email = useSelector(state => state.auth.email);
  const password = useSelector(state => state.auth.password);

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          // User registered successfully
          const uid = userCredential.user.uid;
          console.log('User UID: ', uid);
        })
        .catch(error => {
          console.error(error);
        });
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
    backgroundColor: 'grey',
    justifyContent: 'center', // Center content vertically
    padding: 20, // Add padding
  },
});

export default SignUpScreen;
