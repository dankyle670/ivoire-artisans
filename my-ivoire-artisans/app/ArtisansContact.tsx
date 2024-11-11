import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { darkGreen, white, lightGray } from './Constants';

const ArtisansContact: React.FC = () => {
  const router = useRouter();

  // Function to handle opening the phone dialer
  const handlePhoneCall = () => {
    Linking.openURL('tel:+22500000000'); // Replace with your contact number
  };

  // Function to handle opening the email client
  const handleEmail = () => {
    Linking.openURL('ivoireartisans@gmail.com'); // Replace with your support email
  };

  // Navigate to FAQ page
  const navigateToFAQ = () => {
    router.push('/ArtisansFAQ');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact Us</Text>
      <Text style={styles.infoText}>If you have any questions or need assistance, feel free to reach out to us.</Text>

      {/* Contact Methods */}
      <View style={styles.contactOptions}>

        {/* Phone Call Option */}
        <TouchableOpacity style={styles.contactItem} onPress={handlePhoneCall}>
          <MaterialIcons name="phone" size={30} color={darkGreen} />
          <Text style={styles.contactText}>Call Support</Text>
        </TouchableOpacity>

        {/* Email Option */}
        <TouchableOpacity style={styles.contactItem} onPress={handleEmail}>
          <FontAwesome5 name="envelope" size={30} color={darkGreen} />
          <Text style={styles.contactText}>Email Support</Text>
        </TouchableOpacity>

      </View>

      {/* Additional Support and Button to FAQ */}
      <View style={styles.additionalSupport}>
        <Text style={styles.supportText}>You can also visit our FAQ section for more help.</Text>
        <TouchableOpacity style={styles.faqButton} onPress={navigateToFAQ}>
          <Text style={styles.faqButtonText}>Go to FAQ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: darkGreen,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 30,
  },
  contactOptions: {
    marginBottom: 30,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: lightGray,
    borderBottomWidth: 1,
  },
  contactText: {
    fontSize: 18,
    marginLeft: 20,
    color: darkGreen,
  },
  additionalSupport: {
    marginTop: 20,
    alignItems: 'center',
  },
  supportText: {
    fontSize: 16,
    color: lightGray,
    textAlign: 'center',
  },
  faqButton: {
    marginTop: 15,
    backgroundColor: darkGreen,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  faqButtonText: {
    color: white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ArtisansContact;
