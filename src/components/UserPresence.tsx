import React, { useEffect } from 'react';
import database from '@react-native-firebase/database';

const UserPresence = ({ currentUserId }) => {
  useEffect(() => {
    if (!currentUserId) return; // Ensure currentUserId is provided

    // Firebase reference to the current user's status path
    const currentUserStatusRef = database().ref(`/users/${currentUserId}/status`);

    const isOfflineForDatabase = {
      state: 'offline',
      last_changed: database.ServerValue.TIMESTAMP,
    };

    const isOnlineForDatabase = {
      state: 'online',
      last_changed: database.ServerValue.TIMESTAMP,
    };

    // Firebase special reference to check if the user is connected to Firebase
    const connectedRef = database().ref('.info/connected');

    connectedRef.on('value', (snapshot) => {
      if (snapshot.val() === false) {
        return; // User is not connected, no need to update anything
      }

      // Set the user's status to 'offline' when they disconnect
      currentUserStatusRef
        .onDisconnect()
        .set(isOfflineForDatabase)
        .then(() => {
          // Set the user's status to 'online' when they are connected
          currentUserStatusRef.set(isOnlineForDatabase);
        })
        .catch((err) => console.error('Error setting presence:', err));
    });

    // Cleanup the Firebase connection listener on unmount
    return () => {
      currentUserStatusRef.off();
    };
  }, [currentUserId]);

  // This component doesn't render anything to the UI
  return null;
};

export default UserPresence;
