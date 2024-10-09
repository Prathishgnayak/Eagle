import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const HomeHeader = ({navigation}) => {
  const photo = useSelector(state => state.auth.photo);
  return (
    <View style={styles.View}>
      <View style={styles.ImageView}>
        <TouchableOpacity>
          <Image
            source={require('../assets/images/hamburger.png')}
            style={styles.Hamburger}
          />
        </TouchableOpacity>
        <Text style={styles.Title}>Eagle</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          {photo ? (
            <Image source={{uri: photo}} style={styles.ProfileImage} />
          ) : (
            <Image
              source={require('../assets/images/default_profile.png')}
              style={styles.ProfileImage}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    elevation: 1,
    backgroundColor: 'white',
  },
  Text: {color: 'black'},
  Title: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
  },

  ImageView: {
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  ProfileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  Hamburger: {
    height: 25,
    width: 25,
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeHeader;
