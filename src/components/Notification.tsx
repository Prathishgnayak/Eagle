import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';
// Configure Push Notification settings
PushNotification.configure({
  onRegister: function (token) {
    console.log('Push Notification Token:', token);
  },
  onNotification: function (notification) {
    console.log(
      'Notification clicked or received in background:',
      notification,
    );
    // Handle notification click logic here if needed
  },
  requestPermissions: true,
});

export const createNotificationChannel = () => {
  // Only create the channel if on Android 8.0 or higher
  if (Platform.OS === 'android' && Platform.Version >= 26) {
    PushNotification.createChannel(
      {
        channelId: 'default-channel', // Must be unique
        channelName: 'Default Channel',
        channelDescription: 'A channel to categorize notifications',
        soundName: 'default', // Sound when notification arrives
        importance: PushNotification.Importance.HIGH, // High importance
        vibrate: true, // Enable vibration
      },
      created => {
        if (created) {
          console.log('Notification channel created successfully');
        } else {
          console.log('Notification channel creation failed or already exists');
        }
      },
    );
  } else {
    console.log('Notification channels are only supported on Android 8.0+');
  }
};
// Request notification permission
export async function requestPermission() {
  const authorizationStatus = await messaging().requestPermission();
  if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
    console.log('Notification permission granted');
  } else {
    console.log('Notification permission denied');
  }
}

// Get the FCM token
export async function getToken() {
  const token = await messaging().getToken();
  console.log('FCM Token:', token);
  return token;
}

// Show system notification for foreground messages
export function showLocalNotification(title, message) {
  PushNotification.localNotification({
    channelId: 'default-channel', // Use the created channel ID
    title: title,
    message: message,
    playSound: true,
    priority: 'high',
    importance: 'high',
    soundName: 'default',
  });
}

// Handle notification when app is in foreground
export function handleForegroundNotifications() {
  messaging().onMessage(async remoteMessage => {
    console.log(
      'Foreground notification received:',
      remoteMessage.notification,
    );

    if (remoteMessage.notification) {
      // Display system notification when the app is in the foreground
      showLocalNotification(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
      );
    }
  });
}

// Handle notification when app is in background (app is closed or in the background)
export function handleBackgroundNotifications() {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notification caused app to open:', remoteMessage.notification);

    const navigation = useNavigation();
    if (remoteMessage?.data?.chatId) {
      navigation.navigate('ChatScreen', {
        chatId: remoteMessage.data.chatId, // Navigate to chat screen
      });
    }
  });
}

// Handle notification when app is completely closed and opened by tapping on the notification
export function handleInitialNotification() {
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from a closed state:',
          remoteMessage.notification,
        );

        const navigation = useNavigation();
        if (remoteMessage?.data?.chatId) {
          navigation.navigate('ChatScreen', {
            chatId: remoteMessage.data.chatId, // Navigate to chat screen
          });
        }
      }
    });
}

// Background message handler (this runs when the app is in the background or terminated)
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background:', remoteMessage);

  if (remoteMessage.notification) {
    showLocalNotification(
      remoteMessage.notification.title,
      remoteMessage.notification.body,
    );
  }
});

// Call this function when your app starts to handle all notification scenarios
export function setupNotifications() {
  // Create the notification channel for Android devices
  createNotificationChannel();

  // Request permissions
  requestPermission();

  // Handle notifications in different app states
  handleForegroundNotifications();
  handleBackgroundNotifications();
  handleInitialNotification();

  // Get the FCM token
  getToken();
}
