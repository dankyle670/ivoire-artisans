import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkGreen, white } from './Constants';
import axios from 'axios';

const MenuHomeArtisans: React.FC = () => {
  const router = useRouter();

  // Handle logout
  const handleLogout = async () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            try {
              const userToken = await AsyncStorage.getItem('userToken');
              if (!userToken) {
                Alert.alert('Error', 'No token found, unable to logout.');
                return;
              }

              console.log('Sending token:', userToken); // Debugging log
              // Send logout request to backend
              const response = await axios.post('https://ivoire-artisans-server.netlify.app/api/logout', {
                userToken,
              });
              if (response.status === 200) {
                // Clear user session data locally
                await AsyncStorage.removeItem('userToken');
                await AsyncStorage.removeItem('userInfo');
                // Navigate to Home or Login page
                router.replace('/Home');
              } else {
                Alert.alert('Error', 'An error occurred during logout. Please try again.');
              }
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'An error occurred during logout. Please try again.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {/* Closing menu */}
      <TouchableOpacity style={styles.closeIcon} onPress={() => router.back()}>
        <FontAwesome5 name="times" size={24} color={darkGreen} />
      </TouchableOpacity>

      {/* Profile icon */}
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.avatar} onPress={() => router.push('/')}>
          <FontAwesome5 name="user-circle" size={80} color={darkGreen} />
          <Text style={styles.avatarText}>Choose your avatar</Text>
        </TouchableOpacity>
      </View>

      {/* Menu options */}
      <View style={styles.menuOptions}>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/MyAccountArtisans')}>
          <FontAwesome5 name="user" size={24} color="black" />
          <Text style={styles.menuText}>My Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/PaymentArtisans')}>
          <MaterialIcons name="payment" size={24} color="black" />
          <Text style={styles.menuText}>Payment Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/SettingsArtisans')}>
          <FontAwesome5 name="cog" size={24} color="black" />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/ArtisansSubscriptionOffers')}>
          <FontAwesome5 name="list" size={24} color="black" />
          <Text style={styles.menuText}>Subscription Offers</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/ArtisansChat')}>
          <FontAwesome5 name="comments" size={24} color="black" />
          <Text style={styles.menuText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/ArtisansContact')}>
          <MaterialIcons name="contact-support" size={24} color="black" />
          <Text style={styles.menuText}>Contact</Text>
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <FontAwesome5 name="sign-out-alt" size={24} color="black" />
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  closeIcon: {
    position: 'absolute',
    top: 50,
    left: 200,
    alignSelf: 'center',
    zIndex: 1,
  },
  avatar: {
    top: 70,
    left: 50,
  },
  avatarText: {
    fontSize: 18,
    top: 40,
    color: darkGreen,
    left: -50,
    textAlign: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  menuOptions: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    top: 100,
  },
  menuText: {
    fontSize: 18,
    marginLeft: 20,
    color: 'black',
  },
});

export default MenuHomeArtisans;
