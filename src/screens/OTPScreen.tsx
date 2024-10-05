import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import OtpInputs from 'react-native-otp-inputs';
import auth from '@react-native-firebase/auth';
import {setPhoneNumber} from '../redux/slices/AuthSlice';

const OTP = '000000';

const OTPScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const otpRef = useRef([]);
  const phoneNumber = useSelector(state => state.auth.phoneNumber); // assuming phoneNumber comes from Redux state
  const [confirm, setConfirm] = useState(null); // State to store the confirmation object
  const [isOTPSent, setIsOTPSent] = useState(false); // Track if OTP has been sent
  const [showOtpView, setShowOtpView] = useState(false);

  // Function to send OTP
  // const handleSubmit = async () => {
  //   if (phoneNumber.length ) {
  //     try {
  //       const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
  //       setConfirm(confirmation); // Save the confirmation object
  //       setIsOTPSent(true); // OTP has been sent
  //       console.log('OTP sent to ' + phoneNumber);
  //     } catch (error) {
  //       console.error('Error sending OTP: ', error);
  //     }
  //   } else console.log('number is not valid');
  // };

  // Function to verify OTP
  // const handleVerify = async () => {
  //   const otpValue = otpRef.current.join(''); // Collect OTP value from input
  //   if (otpValue.length === 6) {
  //     // Ensure OTP is 6 digits
  //     try {
  //       await confirm.confirm(otpValue); // Verify the OTP with Firebase
  //       console.log('OTP verified, user logged in.');
  //       navigation.navigate('MainFlow'); // Navigate to next screen after successful verification
  //     } catch (error) {
  //       console.error('Invalid OTP', error);
  //     }
  //   } else {
  //     console.error('Please enter a valid 6-digit OTP.');
  //   }
  // };

  // Automatically send OTP when phoneNumber is available and screen loads
  // React.useEffect(() => {
  //   if (phoneNumber && !isOTPSent) {
  //     handleSubmit(); // Send OTP on component mount if not already sent
  //   }
  // }, [phoneNumber]);

  const handleSubmit = async () => {
    setShowOtpView(true);
  };

  const handleVerify = async () => {
    const otpValue = otpRef.current.join(''); // Collect OTP value from input

    if (otpValue.length === 6) {
      if (otpValue === OTP) {
        console.log('OTP verified, user logged in.');
        navigation.navigate('MainFlow');
      } // Navigate to next screen after successful verification
    } else {
      console.error('Please enter a valid 6-digit OTP.');
    }
  };

  return (
    <View>
      <Text style={styles.Text}>Enter Your Mobile Number for Verification</Text>
      <TextInput
        style={styles.TextInput}
        value={phoneNumber}
        onChangeText={text => {
          dispatch(setPhoneNumber(text));
        }}
      />
      <TouchableOpacity
        style={styles.Submit}
        onPress={() => {
          handleSubmit();
          setShowOtpView(true);
        }}>
        <Text style={styles.SubmitText}>Submit</Text>
      </TouchableOpacity>
      {showOtpView && (
        <View style={styles.View}>
          <Text style={styles.Text}>Enter the OTP sent to {phoneNumber}</Text>
          <View style={styles.CardView}>
            <View style={styles.OTPView}>
              <OtpInputs
                handleChange={code => {
                  otpRef.current = code.split(''); // Update OTP reference
                  if (otpRef.current.length === 6) {
                    handleVerify(); // Auto-submit when 6 digits are entered
                  }
                }}
                numberOfInputs={6}
                autofillFromClipboard
                style={styles.OTP}
                inputStyles={styles.SingleBox}
                focusStyles={styles.OnFocus}
                keyboardType="default"
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CardView: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  Text: {
    color: 'black',
    fontSize: 18,
    marginBottom: 20,
  },
  OTPView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  OTP: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  SingleBox: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    color: 'black',
    padding: 10,
    textAlign: 'center',
    width: 40,
    height: 40,
  },
  OnFocus: {
    borderColor: 'black',
    borderWidth: 2,
  },

  TextInput: {
    height: 50,
    width: '90%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    color: 'black',
    alignSelf: 'center',
  },
  Submit: {
    height: 40,
    width: '90%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  SubmitText: {
    color: 'white',
  },
});

export default OTPScreen;
