import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import Background from './Home_bg';
import Btn from './Btn';
import { darkGreen } from './Constants';
import Field_signup from './Field_signup';
import { useRouter } from 'expo-router'; // Import useRouter from expo-router

const Signup: React.FC = () => {
  const router = useRouter(); // Initialize the router

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSignup = async () => {
    setError('');
    if (password !== repeatPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const apiUrl = 'https://ivoire-artisans-server.netlify.app';
      const response = await axios.post(`${apiUrl}/api/users`, {
        firstName,
        lastName,
        email,
        password,
      });

      // Reset the form
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setRepeatPassword('');

      router.push('/Login'); // Using Expo Router for navigation

    } catch (error: any) {
      // Handle specific errors
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
            value={firstName}
            onChangeText={text => { setError(''); setFirstName(text); }}
            placeholderTextColor='#AEAEAE'
            placeholder="First Name"
          />
          <Field_signup
            value={lastName}
            onChangeText={text => { setError(''); setLastName(text); }}
            placeholderTextColor='#AEAEAE'
            placeholder="Last Name"
          />
          <Field_signup
            value={email}
            keyboardType="email-address"
            onChangeText={text => { setError(''); setEmail(text); }}
            placeholderTextColor='#AEAEAE'
            placeholder="Email"
          />
          <Field_signup
            value={password}
            onChangeText={text => { setError(''); setPassword(text); }}
            placeholderTextColor='#AEAEAE'
            placeholder="Password"
            secureTextEntry
          />
          <Field_signup
            value={repeatPassword}
            onChangeText={text => { setError(''); setRepeatPassword(text); }}
            placeholderTextColor='#AEAEAE'
            placeholder="Repeat Password"
            secureTextEntry
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <View style={styles.termsContainer}>
            <Text style={{ color: 'grey', fontSize: 16 }}>
              By signing up, you agree to our{' '}
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
          <View style={styles.loginContainer}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.push('/Login')}>
              <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </Background>
  );
};

const styles = StyleSheet.create({
  header: {
    top: 10,
    color: 'white',
    fontSize: 64,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subHeader: {
    top: 15,
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: 'white',
    height: 800,
    width: 460,
    borderTopLeftRadius: 130,
    paddingTop: 20,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginVertical: 10,
  },
  termsContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 30,
  },
  privacyContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 30,
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: darkGreen,
    borderRadius: 100,
    alignItems: 'center',
    width: 350,
    paddingVertical: 15,
    bottom: -200,
  },
});

export default Signup;
