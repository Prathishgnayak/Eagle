import NetInfo from '@react-native-community/netinfo';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setInternet} from '../redux/slices/AuthSlice';

const InternetStatusComponent = () => {
  const internet = useSelector(state => state.auth.internet); // Get internet status from Redux store
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(setInternet(state.isConnected));
      console.log(state.isConnected); // Update Redux store with current connection status
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <View>
      {internet ? (
        <Text style={{color: 'green'}}>You are online</Text>
      ) : (
        <Text style={{color: 'red'}}>You are offline</Text>
      )}
    </View>
  );
};

export default InternetStatusComponent;
