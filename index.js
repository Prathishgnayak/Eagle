/**
 * @format
 */

import {AppRegistry, Linking} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to check if the token exists in AsyncStorage
const checkToken = async () => {
  const token = await AsyncStorage.getItem('token');
  console.log('Token from index : ' + token);
  return token ? true : false;
};

// Configure PushNotification library
PushNotification.configure({
  onRegister: function (token) {
    // Handle FCM token generation if needed
  },

  onNotification: async function (notification) {
    console.log('NOTIFICATION:', notification);
    console.log('DeepLink:', notification.data?.url);

    if (notification.data?.url) {
      const deepLink = notification.data.url;
      console.log('Deeplink:', deepLink);

      // Await the token check
      const hasToken = await checkToken();

      if (hasToken) {
        Linking.openURL(deepLink); // Open the deep link
      } else {
        Linking.openURL('eagle://sign-in'); // Navigate to sign-in screen
      }
    }

    // Finish processing the notification
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
  },

  onRegistrationError: function (err) {
    console.error('Push Notification Registration Error:', err.message, err);
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,

  requestPermissions: Platform.OS === 'ios', // Ensure requestPermissions is true for iOS
});

// Handle background notifications
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

// Handle foreground notifications
messaging().onMessage(async remoteMessage => {
  console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));

  // For foreground notifications, display a local notification
  PushNotification.localNotification({
    channelId: 'default',
    title: remoteMessage.notification.title,
    message: remoteMessage.notification.body,
  });
});

AppRegistry.registerComponent(appName, () => App);
