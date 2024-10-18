import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AuthForm from '../components/AuthForm';
import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
import Error from '../components/ErrorToast';
import Toast from 'react-native-toast-message';

const ForgotPassword = ({navigation}) => {
  const email = useSelector(state => state.auth.email);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const handleResetPassword = async () => {
    try {
      setErrors(false);
      setLoading(true);
      await auth().sendPasswordResetEmail(email);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrors(true);
    }
  };

  return (
    <View style={styles.View}>
      {errors && (
        <>
          <Error
            title="Wrong Email"
            text="Please Enter the Valid Email "
          />
          <Toast />
        </>
      )}
      <AuthForm
        title="Reset Password"
        bottomText="Go back "
        navigation={navigation}
        navPath="SignIn"
        onPress={handleResetPassword}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    flex: 1,
    backgroundColor: '#cef8f0',
    justifyContent: 'center',
  },
});

export default ForgotPassword;

// import {StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';
// import React, {useState} from 'react';
// import auth from '@react-native-firebase/auth';
// import {useSelector} from 'react-redux';

// const ForgotPassword = ({navigation}) => {
//   const email = useSelector(state => state.auth.email);

//   // State variables for current and new password
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleResetPassword = async () => {
//     const user = auth().currentUser;

//     // Check if new passwords match
//     if (newPassword !== confirmPassword) {
//       Alert.alert('Error', 'New passwords do not match.');
//       return;
//     }

//     // Re-authenticate the user
//     const credential = auth.EmailAuthProvider.credential(
//       email,
//       currentPassword,
//     );

//     try {
//       // Re-authenticate the user
//       await user.reauthenticateWithCredential(credential);

//       // Update the password
//       await user.updatePassword(newPassword);
//       Alert.alert('Success', 'Password has been updated successfully.');
//       navigation.navigate('AuthFlow'); // Navigate to your desired screen after success
//     } catch (error) {
//       // Handle errors
//       if (error.code === 'auth/wrong-password') {
//         Alert.alert('Error', 'Current password is incorrect.');
//       } else {
//         Alert.alert('Error', error.message);
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Reset Password</Text>

//       {/* Current Password Input */}
//       <TextInput
//         placeholder="Current Password"
//         value={currentPassword}
//         onChangeText={setCurrentPassword}
//         placeholderTextColor="black"
//         secureTextEntry
//         style={styles.input}
//       />

//       {/* New Password Input */}
//       <TextInput
//         placeholder="New Password"
//         value={newPassword}
//         placeholderTextColor="black"
//         onChangeText={setNewPassword}
//         secureTextEntry
//         style={styles.input}
//       />

//       {/* Confirm New Password Input */}
//       <TextInput
//         placeholder="Confirm New Password"
//         placeholderTextColor="black"
//         value={confirmPassword}
//         onChangeText={setConfirmPassword}
//         secureTextEntry
//         style={styles.input}
//       />

//       {/* Change Password Button */}
//       <Button title="Change Password" onPress={handleResetPassword} />

//       {/* Navigation Back to AuthFlow */}
//       <Button
//         title="Go back"
//         onPress={() => navigation.navigate('AuthFlow')}

//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//     textAlign: 'center',
//     color: 'black',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginBottom: 10,
//     color: 'black',
//   },
// });

// export default ForgotPassword;
