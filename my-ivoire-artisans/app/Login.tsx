import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import Background from './Home_bg';
import Btn from './Btn';
import { darkGreen } from './Constants';
import Field_login from './Field_login';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleLogin = async () => {
    try {
      const apiUrl = 'https://ivoire-artisans-server.netlify.app';
      const response = await axios.post(`${apiUrl}/api/login`, { email, password });
      if (response.data.verified) {
        const { token, isFirstLogin, userId, isArtisan, isClient, isLoggedIn, role } = response.data;
        // Store userId and token in AsyncStorage
        await AsyncStorage.setItem('userId', userId);
        await AsyncStorage.setItem('userToken', token); // Ensure you're storing the token as 'userToken'
        // Check if the user is first time login
        if (isFirstLogin) {
          router.push('/ArtisansORClients');
        } else {
          if (isArtisan) {
            router.push('/ArtisansDashboard');
          } else if (isClient) {
            router.push('/ClientDashboard');
          } else if( role === 'admin') {
            router.push('/ArtisansDashboard');
          } else {
            setError('User role not defined.');
          }
        }
      } else {
        setError('User not verified.');
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else if (error.message.includes("Network Error")) {
        setError("Network error: Check your internet connection or API endpoint.");
      } else {
        setError('Failed to login: Invalid credentials or network issue.');
      }
    }
  };

  return (
    <Background>
      <View style={{ alignItems: 'center', width: 390 }}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.instructionText}>Login to your account</Text>
          <Field_login
            placeholder="Email / Username"
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
          />
          <Field_login
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Login"
            Press={handleLogin}
          />
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/Signup')}>
              <Text style={styles.signupLink}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 64,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  formContainer: {
    backgroundColor: 'white',
    height: 700,
    width: 460,
    borderTopLeftRadius: 130,
    paddingTop: 100,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold',
  },
  instructionText: {
    color: 'black',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginVertical: 10,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    width: '78%',
    paddingRight: 16,
    marginBottom: 300,
  },
  forgotPasswordText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupLink: {
    color: darkGreen,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Login;
