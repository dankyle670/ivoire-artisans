import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';

const VerifyEmail = ({ route, navigation }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleDeepLink = (event) => {
      console.log('Deep link received:', event.url); // Log the received URL
      const url = event.url;
      const token = new URL(url).searchParams.get('token');

      if (!token) {
        setMessage('No token provided');
        setLoading(false);
        return;
      }

      verifyEmail(token);
    };

    const linkingListener = Linking.addEventListener('url', handleDeepLink);

    return () => {
      linkingListener.remove();
    };
  }, []);

  const verifyEmail = async (token) => {
    try {
      const apiUrl = 'https://ivoire-artisans-server.netlify.app';
      const response = await axios.get(`${apiUrl}/api/verify-email?token=${token}`);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Error verifying email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Go to Login</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    margin: 20,
  },
  loginLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default VerifyEmail;
