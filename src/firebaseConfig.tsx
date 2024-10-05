// Import the functions you need from the SDKs you need
import {initializeApp} from '@react-native-firebase/app';
//import {getAnalytics} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDg7ixQVb4UdCGstDkgSYiSZFInxIkf2k8',
  authDomain: 'eagle-a524b.firebaseapp.com',
  projectId: 'eagle-a524b',
  storageBucket: 'eagle-a524b.appspot.com',
  messagingSenderId: '851671427134',
  appId: '1:851671427134:web:73a748ea48df7418a3896f',
  measurementId: 'G-R7LVJDD455',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export default app;

