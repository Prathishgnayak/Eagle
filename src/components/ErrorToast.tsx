import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import Toast from 'react-native-toast-message';

const Error = ({title, text}) => {
  const showTopToast = () => {
    Toast.show({
      type: 'error', // or 'success', 'info'
      text1: title || 'Error',
      text2: text || 'Something went wrong!',
      position: 'top', // Can be 'top', 'bottom'
      visibilityTime: 4000, // Duration for which the toast will be visible
      autoHide: true, // Automatically hide the toast after the visibility time
      topOffset: 50, // How far from the top the toast should be displayed
      style: {
        width: 350, // Custom width of the toast
        padding: 10, // Padding inside the toast container
        borderRadius: 10, // Rounded corners for the toast
        backgroundColor: '#ffcccb', // Custom background color
      },
      text1Style: {
        fontSize: 16, // Custom font size for the title
        //fontWeight: 'bold',
        color: 'red', // Custom text color for the title
      },
      text2Style: {
        fontSize: 14, // Custom font size for the message
        color: 'black', // Custom text color for the message
      },
    });
  };

  useEffect(() => {
    showTopToast();
  }, []);

  return null;
};

export default Error;
