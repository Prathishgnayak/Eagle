import ReactNativeBiometrics from 'react-native-biometrics';

const BiometricAuth = () => {
  const rnBiometrics = new ReactNativeBiometrics();
  rnBiometrics
    .simplePrompt({promptMessage: 'Confirm fingerprint'})
    .then(resultObject => {
      const {success} = resultObject;

      if (success) {
        console.log('successful biometrics provided');
      } else {
        console.log('user cancelled biometric prompt');
      }
    })
    .catch(() => {
      console.log('biometrics failed');
    });
};

export default BiometricAuth;
