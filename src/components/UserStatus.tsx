import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import database from '@react-native-firebase/database';

const UserStatus = ({ uid }) => {
  const [status, setStatus] = useState('offline'); // Default status

  useEffect(() => {
    // Firebase reference to read the user's status
    const userStatusDatabaseRef = database().ref(`/users/${uid}/status`);

    // Listen for changes in the user's status
    const onStatusChange = userStatusDatabaseRef.on('value', (snapshot) => {
      const userStatus = snapshot.val();
      console.log('userStatus: ', userStatus); // Log status for debugging

      if (userStatus && userStatus.state) {
        setStatus(userStatus.state); // Set the status to 'online' or 'offline'
      } else {
        setStatus('offline'); // Default to offline if status is not available
      }
    });

    // Cleanup listener on unmount
    return () => {
      userStatusDatabaseRef.off('value', onStatusChange); // Stop listening when component unmounts
    };
  }, [uid]);

  // Render the user's online status
  return (
    <View>
      <Text style={styles.text}>
        {status === 'online' ? 'Online' : 'Offline'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 16,
  },
});

export default UserStatus;
