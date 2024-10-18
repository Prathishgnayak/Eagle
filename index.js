/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';

// Configure PushNotification library
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('FCM Token:', token); // Log the token
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // Process the notification
    // You can also use this to navigate or show an alert
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);
    // Process the action (e.g. navigate based on notification data)
  },

  // (optional) Called when the user fails to register for remote notifications
  onRegistrationError: function (err) {
    console.error('Push Notification Registration Error:', err.message, err);
  },

  // IOS ONLY (optional): permissions to register (default: all)
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  popInitialNotification: true,

  // Request permissions (iOS) and token (Android and iOS)
  requestPermissions: Platform.OS === 'ios', // Ensure requestPermissions is true for iOS
});

// Handle background notifications
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  // Here you can also navigate to specific screens based on the notification data
});

// Handle foreground notifications
messaging().onMessage(async remoteMessage => {
  console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));

  // For foreground notifications, display a local notification
  PushNotification.localNotification({
    channelId: 'default', // Ensure you have the right channel ID set
    title: remoteMessage.notification.title,
    message: remoteMessage.notification.body,
  });

  // Optionally, navigate based on the data from the notification
  // For example:
  // if (remoteMessage.data && remoteMessage.data.screen) {
  //   navigation.navigate(remoteMessage.data.screen);
  // }
});

// App component registration
AppRegistry.registerComponent(appName, () => App);
