// AuthScreen.js
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const OTP_LENGTH = 6; // Define OTP length as a constant
const OTP = '00000'; // Replace this with your actual OTP logic

const AuthScreen = ({navigation}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpArray, setOtpArray] = useState(new Array(OTP_LENGTH).fill(''));
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timer, setTimer] = useState(60); // Timer state
  const [isTimerActive, setIsTimerActive] = useState(false); // To check if the timer is active
  const otpInputs = useRef([]);

  useEffect(() => {
    let interval = null;

    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (!isTimerActive && timer !== 0) {
      clearInterval(interval);
    }

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const handleSendOtp = () => {
    // Logic to send OTP can be implemented here
    console.log(`Sending OTP to ${mobileNumber}`);
    setIsOtpSent(true);
    setIsTimerActive(true);
    setTimer(60); // Reset timer to 60 seconds
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otpArray.join('');
    if (enteredOtp === OTP) {
      console.log('Successfully verified');
      navigation.navigate('MainFlow'); // Navigate to the main flow
    } else {
      console.log('Invalid OTP');
      alert('Invalid OTP. Please try again.'); // Optional: Alert for invalid OTP
    }
  };

  const handleOtpChange = (value, index) => {
    const updatedOtpArray = [...otpArray];
    updatedOtpArray[index] = value;
    setOtpArray(updatedOtpArray);

    // Move to the next input if a digit is entered
    if (value && index < OTP_LENGTH - 1) {
      otpInputs.current[index + 1].focus();
    }

    // Verify OTP when the last digit is entered
    if (updatedOtpArray.every(otp => otp) && index === OTP_LENGTH - 1) {
      handleVerifyOtp();
    }
  };

  const handleOtpKeyPress = index => {
    // Focus on the previous input if backspace is pressed
    if (index > 0) {
      otpInputs.current[index - 1].focus();
    }
  };

  const renderOtpInputs = () => {
    return otpArray.map((_, index) => (
      <TextInput
        key={index}
        ref={input => (otpInputs.current[index] = input)} // Reference to each input
        style={styles.otpInput}
        keyboardType="number-pad"
        maxLength={1}
        value={otpArray[index]}
        onChangeText={value => handleOtpChange(value, index)}
        onKeyPress={({nativeEvent}) => {
          if (nativeEvent.key === 'Backspace') {
            handleOtpKeyPress(index);
          }
        }}
      />
    ));
  };

  const handleResendOtp = () => {
    handleSendOtp(); // Resend OTP logic
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isOtpSent ? 'Enter OTP' : 'Enter Your Mobile Number'}
      </Text>

      {!isOtpSent ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            keyboardType="phone-pad"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            maxLength={10}
          />
          <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.subtitle}>
            An OTP has been sent to {mobileNumber}
          </Text>
          <View style={styles.otpContainer}>{renderOtpInputs()}</View>
          {timer > 0 ? (
            <Text style={styles.timerText}>Resend OTP in {timer}s</Text>
          ) : (
            <TouchableOpacity
              style={styles.resendButton}
              onPress={handleResendOtp}>
              <Text style={styles.buttonText}>Resend OTP</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#cef8f0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#666',
  },
  input: {
    borderColor: '#007BFF',
    borderWidth: 2,
    borderRadius: 8,
    paddingLeft: 10,
    margin: 10,
    backgroundColor: '#FFF',
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#030000',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    width: '80%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInput: {
    borderColor: '#007BFF',
    borderWidth: 2,
    borderRadius: 8,
    width: 40,
    height: 50,
    margin: 5,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#FFF',
    color: '#000',
  },
  timerText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    color: '#FF0000',
  },
  resendButton: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 8,
  },
});

export default AuthScreen;
