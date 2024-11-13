import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { darkGreen, lightGray, white } from './Constants';
import Btn from './Btn';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Add AsyncStorage import

const MyAccountArtisans: React.FC = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subscription, setSubscription] = useState<string>(''); // Default subscription
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>(''); // Using userId as artisan ID
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve userId from AsyncStorage
        const storedUserId = await AsyncStorage.getItem('userId');

        if (!storedUserId) {
          setError('User ID not found');
          return;
        }

        // Pass the userId as a query parameter
        const response = await axios.get(
          `https://ivoire-artisans-server.netlify.app/api/user?userId=${storedUserId}`
        );
        const { firstName, lastName, email, subscription, _id, profilePicture } = response.data;

        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setSubscription(subscription); // Set subscription from API
        setUserId(_id); // Set userId directly
        setProfilePicture(profilePicture);
      } catch (err) {
        setError('Failed to fetch user data');
      }
    };
    fetchUserData();
  }, []);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfilePicture(result.uri);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.put('https://ivoire-artisans-server.netlify.app/api/user', {
        userId,
        firstName,
        lastName,
        email,
      });
      if (response.status === 200) {
        alert('Account updated successfully!');
      }
    } catch (err) {
      setError('Failed to update account details');
    }
  };

  // Navigate to the subscription page
  const navigateToSubscription = () => {
    router.push('/ArtisansSubscriptionOffers');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.header}></Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity onPress={handleImagePick}>
          {profilePicture ? (
            <Image source={{ uri: profilePicture }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileImageText}>Select Image</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.artisanID}>Artisan ID: {userId}</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter your first name"
            
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter your last name"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        </View>

        {/* Replace the subscription TextInput with a button */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Subscription Plan</Text>
          <TouchableOpacity style={styles.subscriptionButton} onPress={navigateToSubscription}>
            <Text style={styles.subscriptionButtonText}>{subscription || 'Select a plan'}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionHeader}>Transaction History</Text>
        {transactionHistory.map((transaction, index) => (
          <View key={index} style={styles.transactionItem}>
            <Text>{transaction.description}</Text>
            <Text>{transaction.amount}</Text>
          </View>
        ))}

        <Btn
          textColor="white"
          bgColor={darkGreen}
          btnLabel="Save Changes"
          Press={handleSave}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: darkGreen,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageText: {
    color: 'black',
  },
  artisanID: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: lightGray,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
    color: 'black',
  },
  subscriptionButton: {
    width: '100%',
    padding: 10,
    borderColor: lightGray,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightGray,
  },
  subscriptionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: darkGreen,
    marginTop: 20,
    marginBottom: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 8,
    borderBottomColor: lightGray,
    borderBottomWidth: 1,
  },
});

export default MyAccountArtisans;
