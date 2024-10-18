import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setEmail, setName, setPassword} from '../redux/slices/AuthSlice';
import GoogleSign from './GoogleSign';
//import FaceBookSignIn from './FaceBookSignIn';
import AppleSignIn from './AppleSignIn';
import SignInwithFacebook from './SignInwithFacebook';
import Loader from './Loader';

const AuthForm = ({
  title,
  bottomText,
  navigation,
  navPath,
  onPress,
  loading,
}) => {
  const dispatch = useDispatch();
  const email = useSelector(state => state.auth.email);
  const password = useSelector(state => state.auth.password);
  const name = useSelector(state => state.auth.name);

  if (loading) {
    return <Loader />;
  }
  return (
    <View>
      <View style={styles.CardView}>
        <Text style={styles.title}>{title}</Text>
        {title === 'Sign Up' ? (
          <TextInput
            value={name}
            onChangeText={text => {
              dispatch(setName(text));
            }}
            placeholder="Username"
            placeholderTextColor="grey"
            style={styles.TextInput}
            keyboardType="default"
            accessibilityLabel="Email input"
          />
        ) : null}
        <TextInput
          value={email}
          onChangeText={text => {
            dispatch(setEmail(text));
          }}
          placeholder="Email"
          placeholderTextColor="grey"
          style={styles.TextInput}
          keyboardType="email-address"
          accessibilityLabel="Email input"
        />
        <TextInput
          value={password}
          onChangeText={text => {
            dispatch(setPassword(text));
          }}
          placeholder="Password"
          placeholderTextColor="grey"
          style={styles.TextInput}
          secureTextEntry
          accessibilityLabel="Password input"
        />

        {title === 'Sign In' ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Forgot');
            }}>
            <Text style={styles.forgotPassWord}>Forgot Password..?</Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          style={styles.Button}
          onPress={onPress}
          activeOpacity={0.7}>
          <Text style={styles.ButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.BottomView}>
        <Text style={styles.BottomText}>{bottomText}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(`${navPath}`);
          }}>
          <Text style={styles.navPath}>{navPath}</Text>
        </TouchableOpacity>
      </View>

      {title === 'Sign In' ? (
        <View>
          <Text style={styles.orText}>------- or --------</Text>

          <View style={styles.OtherSignInView}>
            <GoogleSign navigation={navigation} />
            <SignInwithFacebook navigation={navigation} />
            <AppleSignIn navigation={navigation} />
          </View>
          <Button
            title="Profile"
            onPress={() => {
              navigation.navigate('MainFlow');
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  View: {},
  CardView: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 10,
    padding: 20,
    margin: 10,
  },
  title: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  TextInput: {
    color: 'black',
    height: 50,
    borderBottomWidth: 1,
    borderColor: 'grey',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  Button: {
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 10,
    backgroundColor: 'black',
  },
  ButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  BottomText: {
    color: 'black',
  },
  navPath: {
    color: 'blue',
  },
  BottomView: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  forgotPassWord: {
    color: 'blue',
    alignSelf: 'flex-end',
    margin: 10,
  },
  OtherSignInView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    //alignContent:'center'
    width: '70%',
    alignSelf: 'center',
  },
  EmailImage: {
    height: 30,
    width: 30,
  },
  emailButton: {
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius: 50,
    elevation: 10,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  GoogleImage: {
    height: 30,
    width: 30,
  },
  FacebookImage: {
    height: 30,
    width: 30,
  },

  AppleImage: {
    height: 30,
    width: 30,
    top: -2,
  },
  orText: {
    color: 'black',
    fontSize: 19,
    alignSelf: 'center',
    marginTop: 10,
  },
});
export default AuthForm;
