import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const OTP_LENGTH = 6;

const OtpScreen = ({navigation}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpArray, setOtpArray] = useState(new Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(59);
  const [confirm, setConfirm] = useState(null);
  const otpInputs = useRef([]);

  useEffect(() => {
    let interval = null;

    if (timer > 0 && isOtpSent) {
      interval = setInterval(() => setTimer(prevTimer => prevTimer - 1), 1000);
    }

    return () => clearInterval(interval);
  }, [timer, isOtpSent]);

  //Handle change in the text Input array
  const handleOtpChange = (value, index) => {
    const updatedOtpArray = [...otpArray];
    updatedOtpArray[index] = value;
    setOtpArray(updatedOtpArray);

    // Automatically focus the next input
    if (value && index < OTP_LENGTH - 1) {
      otpInputs.current[index + 1].focus();
    }
    // Automatically focus the previous input when a value cleared
    if (!value && index > 0) {
      otpInputs.current[index - 1].focus();
    }
  };

  //Resend OTP
  const handleResendOtp = () => {
    setTimer(59);
    setOtpArray(new Array(OTP_LENGTH).fill(''));
    setIsOtpSent(false);
    console.log('OTP resent');
    handleSendOtp();
  };

  // Function to send OTP using Firebase
  const handleSendOtp = async () => {
    try {
      const phoneNumberWithCountryCode = `+91${mobileNumber}`; // Format the number
      const confirmation = await auth().signInWithPhoneNumber(
        phoneNumberWithCountryCode,
      );

      setConfirm(confirmation);
      setIsOtpSent(true);
      setTimer(59);

      console.log('OTP sent successfully:', confirmation);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  // Function to verify the entered OTP
  const handleVerifyOtp = async () => {
    const enteredOtp = otpArray.join('');
    if (confirm) {
      try {
        const response = await confirm.confirm(enteredOtp);
        console.log('OTP verified successfully:', response);
        navigation.navigate('MainFlow');
      } catch (error) {
        console.error('Invalid OTP:', error); // Log any error during OTP verification
      }
    } else {
      console.log('No confirmation object found, please request OTP again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Phone number Section */}
      <Text style={styles.headerText}>Verify Phone Number</Text>

      <View style={styles.CardView}>
        {!isOtpSent ? (
          <>
            <Text style={styles.subHeaderText}>Enter your phone number</Text>
            <TextInput
              style={styles.phoneInput}
              keyboardType="phone-pad"
              placeholder="Phone Number"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              maxLength={14} // Adjust based on your requirements
            />
            <TouchableOpacity
              style={styles.sendOtpButton}
              onPress={handleSendOtp}>
              <Text style={styles.sendOtpButtonText}>Send OTP</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* OTP Section */}
            <Text style={styles.subHeaderText}>
              OTP has been sent to{' '}
              <Text style={styles.boldText}>{mobileNumber}</Text>
            </Text>

            <View style={styles.otpContainer}>
              {otpArray.map((_, index) => (
                <TextInput
                  key={index}
                  ref={input => (otpInputs.current[index] = input)}
                  style={styles.otpInput}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={otpArray[index]}
                  onChangeText={value => handleOtpChange(value, index)}
                />
              ))}
            </View>

            {timer > 0 ? (
              <Text style={styles.timerText}>
                Resend OTP in 00:{timer < 10 ? `0${timer}` : timer}
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResendOtp}>
                <Text style={styles.resendText}>Resend OTP</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={handleVerifyOtp}>
              <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#cef8f0',
  },
  CardView: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 350,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    elevation: 10,
    gap: 15,
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subHeaderText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
    color: 'black',
  },
  boldText: {
    fontWeight: '700',
    color: '#333',
  },
  phoneInput: {
    borderColor: '#000000',
    borderWidth: 0,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#FFF',
    color: '#000',
    elevation: 10,
  },
  sendOtpButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  sendOtpButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  otpInput: {
    borderColor: 'black',
    borderWidth: 0,
    borderRadius: 10,
    width: 50,
    height: 50,
    marginHorizontal: 4,
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
    backgroundColor: '#FFF',
    elevation: 10,
  },
  timerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  resendText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#007BFF',
    fontWeight: '500',
    marginBottom: 20,
  },
  verifyButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  verifyButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OtpScreen;
