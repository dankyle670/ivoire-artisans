import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import Background from './Home_bg';
import Btn from './Btn';
import { darkGreen } from './Constants';
import Field_signup from './Field_signup';
import VerifyEmail from './VerifyEmail';

const Signup = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (password !== repeatPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const apiUrl = 'https://ivoire-artisans-server.netlify.app'; // Ensure this matches your server URL
      const response = await axios.post(`${apiUrl}/api/users`, {
        name,
        email,
        password,
      });

      // Reset the form
      setName('');
      setEmail('');
      setPassword('');
      setRepeatPassword('');
      setError('');

      // Navigate to the VerifyEmail screen
      props.navigation.navigate('VerifyEmail', { token: response.data.token });

    } catch (error) {
      if (error.response) {
        setError(`Failed to create account: ${error.response.data.message}`);
      } else if (error.request) {
        setError('Failed to create account: No response from server.');
      } else {
        setError(`Failed to create account: ${error.message}`);
      }
    }
  };

  return (
    <Background>
      <View style={{ alignItems: 'center', width: 390 }}>
        <Text style={styles.header}>Register</Text>
        <Text style={styles.subHeader}>Create a new account</Text>
        <View style={styles.formContainer}>
          <Field_signup
            value={name}
            onChangeText={text => { setError(''); setName(text); }}
            placeholderTextColor={'#AEAEAE'}
            placeholder="Name"
          />
          <Field_signup
            value={email}
            keyboardType="email-address"
            onChangeText={text => { setError(''); setEmail(text); }}
            placeholderTextColor={'#AEAEAE'}
            placeholder="Email"
          />
          <Field_signup
            value={password}
            onChangeText={text => { setError(''); setPassword(text); }}
            placeholderTextColor={'#AEAEAE'}
            placeholder="Password"
            secureTextEntry
          />
          <Field_signup
            value={repeatPassword}
            onChangeText={text => { setError(''); setRepeatPassword(text); }}
            placeholderTextColor={'#AEAEAE'}
            placeholder="Repeat Password"
            secureTextEntry
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <View style={styles.termsContainer}>
            <Text style={{ color: 'grey', fontSize: 16 }}>
              By signing in, you agree to our{' '}
            </Text>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
              Terms & Conditions
            </Text>
          </View>
          <View style={styles.privacyContainer}>
            <Text style={{ color: 'grey', fontSize: 16 }}>and </Text>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
              Privacy Policy
            </Text>
          </View>
          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Signup"
            Press={handleSignup}
          />
          <View style={styles.loginContainer}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
              <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  header: {
    color: 'white',
    fontSize: 64,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subHeader: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: 'white',
    height: 700,
    width: 460,
    borderTopLeftRadius: 130,
    paddingTop: 50,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginVertical: 10,
  },
  termsContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '78%',
    paddingRight: 16,
  },
  privacyContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '78%',
    paddingRight: 16,
    marginBottom: 300,
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Signup;





//import React, { useState } from 'react';
//import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
//import axios from 'axios';
//import Background from './Home_bg';
//import Btn from './Btn';
//import { darkGreen } from './Constants';
//import Field_signup from './Field_signup';
////import VerifyEmail from './VerifyEmail';
////require('dotenv').config();
//
//
//const Signup = (props) => {
//  const [name, setName] = useState('');
//  const [email, setEmail] = useState('');
//  const [password, setPassword] = useState('');
//  const [repeatPassword, setRepeatPassword] = useState('');
//  const [error, setError] = useState('');
//  //const [message, setMessage] = useState('');
//  // handling signup logic
//  const handleSignup = async () => {
//
//    if (password !== repeatPassword) {
//      setError('Passwords do not match');
//      return;
//    }
//    try {
//      const apiUrl = 'https://ivoire-artisans-server.netlify.app'; // Ensure this matches your server URL
//      //console.log('Sending request to:', `${apiUrl}/api/users`);
//      const response = await axios.post(`${apiUrl}/api/users`, {
//        name,
//        email,
//        password,
//      });
//      //console.log('User created successfully:', response.data);
//      // Reset the form
//      setName('');
//      setEmail('');
//      setPassword('');
//      setRepeatPassword('');
//      setError('');
//  
//      // Navigate to another screen or show a success message
//      props.navigation.navigate('Login');
//    } catch (error) {
//      if (error.response) {
//        console.error('Error response data:', error.response.data);
//        console.error('Error response status:', error.response.status);
//        console.error('Error response headers:', error.response.headers);
//        setError(`Failed to create account: ${error.response.data.message}`);
//      } else if (error.request) {
//        console.error('Error request data:', error.request);
//        setError('Failed to create account: No response from server.');
//      } else {
//        console.error('Error message:', error.message);
//        setError(`Failed to create account: ${error.message}`);
//      }
//      console.error('Error config:', error.config);
//    }
//  };
//
//
//  return (
//    <Background>
//      <View style={{ alignItems: 'center', width: 390 }}>
//        <Text style={styles.header}>Register</Text>
//        <Text style={styles.subHeader}>Create a new account</Text>
//        <View style={styles.formContainer}>
//          <Field_signup
//            value={name}
//            onChangeText={text => { setError(''); setName(text); }}
//            placeholderTextColor={'#AEAEAE'}
//            placeholder="Name"
//          />
//          <Field_signup
//            value={email}
//            keyboardType="email-address"
//            onChangeText={text => { setError(''); setEmail(text); }}
//            placeholderTextColor={'#AEAEAE'}
//            placeholder="Email"
//          />
//          <Field_signup
//            value={password}
//            onChangeText={text => { setError(''); setPassword(text); }}
//            placeholderTextColor={'#AEAEAE'}
//            placeholder="Password"
//            secureTextEntry
//          />
//          <Field_signup
//            value={repeatPassword}
//            onChangeText={text => { setError(''); setRepeatPassword(text); }}
//            placeholderTextColor={'#AEAEAE'}
//            placeholder="Repeat Password"
//            secureTextEntry
//          />
//          {error ? <Text style={styles.errorText}>{error}</Text> : null}
//          <View style={styles.termsContainer}>
//            <Text style={{ color: 'grey', fontSize: 16 }}>
//              By signing in, you agree to our{' '}
//            </Text>
//            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
//              Terms & Conditions
//            </Text>
//          </View>
//          <View style={styles.privacyContainer}>
//            <Text style={{ color: 'grey', fontSize: 16 }}>and </Text>
//            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
//              Privacy Policy
//            </Text>
//          </View>
//          <Btn
//            textColor="white"
//            bgColor={darkGreen}
//            btnLabel="Signup"
//            Press={handleSignup}
//          />
//          <View style={styles.loginContainer}>
//            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
//              Already have an account?{' '}
//            </Text>
//            <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
//              <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
//                Login
//              </Text>
//            </TouchableOpacity>
//          </View>
//        </View>
//      </View>
//    </Background>
//  );
//};
//
//const styles = StyleSheet.create({
//  header: {
//    color: 'white',
//    fontSize: 64,
//    fontWeight: 'bold',
//    marginTop: 20,
//  },
//  subHeader: {
//    color: 'white',
//    fontSize: 19,
//    fontWeight: 'bold',
//    marginBottom: 20,
//  },
//  formContainer: {
//    backgroundColor: 'white',
//    height: 700,
//    width: 460,
//    borderTopLeftRadius: 130,
//    paddingTop: 50,
//    alignItems: 'center',
//  },
//  errorText: {
//    color: 'red',
//    marginVertical: 10,
//  },
//  termsContainer: {
//    display: 'flex',
//    flexDirection: 'row',
//    width: '78%',
//    paddingRight: 16,
//  },
//  privacyContainer: {
//    display: 'flex',
//    flexDirection: 'row',
//    justifyContent: 'center',
//    width: '78%',
//    paddingRight: 16,
//    marginBottom: 300,
//  },
//  loginContainer: {
//    display: 'flex',
//    flexDirection: 'row',
//    justifyContent: 'center',
//  },
//});
//
//export default Signup;
