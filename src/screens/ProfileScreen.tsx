import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {resetState} from '../redux/slices/AuthSlice';
import {LoginManager} from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}) => {
  const email = useSelector(state => state.auth.email);
  const password = useSelector(state => state.auth.password);
  const phoneNumber = useSelector(state => state.auth.phoneNumber);
  const photo = useSelector(state => state.auth.photo);
  const idToken = useSelector(state => state.auth.idToken);
  const uid = useSelector(state => state.auth.uid);
  const name = useSelector(state => state.auth.name);
  const status = useSelector(state => state.auth.status);

  console.log(
    'Email : ' +
      email +
      '  password :   ' +
      password +
      '  Number :   ' +
      phoneNumber +
      '  photo :   ' +
      photo +
      '  TOken :   ' +
      idToken +
      '  uid :   ' +
      uid +
      '  name :   ' +
      name +
      '  status :   ' +
      status,
  );
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const handleSignOut = async () => {
    try {
      await auth().signOut();
      await GoogleSignin.signOut();
      await LoginManager.logOut();
      await dispatch(resetState());
      console.log('logged out successfully');
      navigation.navigate('SignIn');
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.View}>
      <Text style={styles.Title}>Profile</Text>
      <View style={styles.CardView}>
        {photo ? (
          <Image source={{uri: photo}} style={styles.ProfileImage} />
        ) : (
          <Image
            source={require('../assets/images/default_profile.png')}
            style={styles.ProfileImage}
          />
        )}
        <Text style={styles.Text}>Email : {email}</Text>

        {/* <View style={styles.passwordView}>
          {showPassword ? (
            <Text style={styles.Text}>password : {password}</Text>
          ) : (
            <Text style={styles.Text}>password : </Text>
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
        </View> */}
      </View>
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
  View: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#cef8f0',
  },
  CardView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 10,
    padding: 20,
    height: '50%',
    width: '90%',
  },
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
    margin: 0,
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
