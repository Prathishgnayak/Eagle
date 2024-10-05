import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AuthForm from '../components/AuthForm';
import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';

const ForgotPassword = ({navigation}) => {
  const email = useSelector(state => state.auth.email);
  const handleResetPassword = async () => {
    await auth().sendPasswordResetEmail(email);
  };

  return (
    <View>
      <AuthForm
        title="Reset Password"
        bottomText="Go back"
        navigation={navigation}
        navPath="AuthFlow"
        onPress={handleResetPassword}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    flex: 1,
  },
});

export default ForgotPassword;
