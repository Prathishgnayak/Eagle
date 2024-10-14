import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';

const UserInfo = () => {
  const user = {
    email: useSelector(state => state.auth.email),
    phoneNumber: useSelector(state => state.auth.phoneNumber),
    photo: useSelector(state => state.auth.photo),
    idToken: useSelector(state => state.auth.idToken),
    uid: useSelector(state => state.auth.uid),
    name: useSelector(state => state.auth.name),
    status: useSelector(state => state.auth.status),
  };

  // Storing user data in Firebase under their unique UID
  database()
    .ref(`/users/${user.uid}`)
    .set({
      email: user.email,
      phoneNumber: user.phoneNumber,
      photo: user.photo,
      idToken: user.idToken, // It's fine to store the ID token temporarily
      name: user.name,
      status: user.status,
    })
    .then(() => {
      console.log('User details stored in DB');
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

export default UserInfo;
