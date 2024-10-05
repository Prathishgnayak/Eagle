/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Provider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {enableScreens} from 'react-native-screens';
import store from './redux/store';
import SignInScreen from './screens/SignInScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SignUpScreen from './screens/SignUpScreen';
import OTPScreen from './screens/OTPScreen';
import AddScreen from './screens/AddScreen';
import ChatScreen from './screens/ChatScreen';
import {Image} from 'react-native';
// Statically import your images
import HomeIcon from './assets/images/home.png';
import PlusIcon from './assets/images/plus.png';
import ProfileIcon from './assets/images/profile.png';

enableScreens();

const App = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const MainFlow = () => {
    return (
      <Tab.Navigator
        initialRouteName="Add"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconSource;

            // Choose the correct icon based on the route name
            if (route.name === 'Home') {
              iconSource = HomeIcon;
            } else if (route.name === 'Add') {
              iconSource = PlusIcon;
            } else if (route.name === 'Profile') {
              iconSource = ProfileIcon;
            }

            // Return the Image component
            return (
              <Image
                source={iconSource}
                style={{width: 35, height: 35, tintColor: color}}
              />
            );
          },
          headerShown: false,
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 70, // Increase the height of the tab bar here
            paddingBottom: 0, // Adjust padding if needed
            backgroundColor: 'white',
          },
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Add" component={AddScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  };

  const AuthFlow = () => {
    return (
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
      </Stack.Navigator>
    );
  };
  const ChatFlow = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    );
  };
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="AuthFlow"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="AuthFlow" component={AuthFlow} />
            <Stack.Screen name="MainFlow" component={MainFlow} />
            <Stack.Screen name="ChatFlow" component={ChatFlow} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
