import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const ProfileScreen = ({navigation}) => {
  const email = useSelector(state => state.auth.email);
  const password = useSelector(state => state.auth.password);
  const phoneNumber = useSelector(state => state.auth.phoneNumber);

  const [showPassword, setShowPassword] = useState(false);

  const handleSignOut = async () => {
    try {
      await auth().signOut();
      await GoogleSignin.signOut();
      console.log('logged out successfully');
      navigation.navigate('SignIn');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.View}>
      <Text style={styles.Title}>Profile</Text>
      <Image
        source={require('../assets/images/black_image.png')}
        style={styles.ProfileImage}
      />
      <Text style={styles.Text}>Email : {email}</Text>

      <View style={styles.passwordView}>
        {showPassword ? (
          <Text style={styles.Text}>password : {password}</Text>
        ) : (
          <Text style={styles.Text}>password : _______</Text>
        )}

        {!showPassword ? (
          <TouchableOpacity
            onPress={() => {
              setShowPassword(true);
            }}>
            <Image
              source={require('../assets/images/view.png')}
              style={styles.passwordShow}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setShowPassword(false);
            }}>
            <Image
              source={require('../assets/images/hide.png')}
              style={styles.passwordHide}
            />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.Text}>Phone Number : {phoneNumber}</Text>

      <TouchableOpacity
        style={styles.SignOutButton}
        onPress={() => {
          handleSignOut();
        }}>
        <Text style={styles.SignOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  View: {flex: 1, justifyContent: 'space-evenly', alignItems: 'center'},
  Text: {
    color: 'black',
    fontSize: 20,
  },
  Title: {color: 'black', fontSize: 30},
  ProfileImage: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  SignOutButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: 'black',
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
  },
  SignOutButtonText: {
    color: 'white',
    fontSize: 17,
  },
  passwordView: {flexDirection: 'row', alignItems: 'center'},
  passwordShow: {height: 20, width: 20, marginLeft: 20},
  passwordHide: {height: 20, width: 20, marginLeft: 20},
});

export default ProfileScreen;
