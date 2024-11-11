import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { white, darkGreen } from './Constants';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CountryCode {
  code: string;
  country: string;
  flag: string;
}

const countryCodes: CountryCode[] = [
  { code: '+225', country: 'Côte d\'Ivoire', flag: '🇨🇮' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+1', country: 'États-Unis', flag: '🇺🇸' },
  { code: '+91', country: 'Inde', flag: '🇮🇳' },
];

const ClientsInfos: React.FC = () => {
  const router = useRouter();
  const [countryCodeModalVisible, setCountryCodeModalVisible] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('+225');

  const selectCountryCode = (code: string) => {
    setSelectedCountryCode(code);
    setCountryCodeModalVisible(false);
  };

  const isFormComplete = phoneNumber.length > 0;

  const savePhoneNumber = async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      Alert.alert('Error', 'User not found');
      return;
    }

    try {
      const apiUrl = 'https://ivoire-artisans-server.netlify.app';
      await axios.post(`${apiUrl}/api/saveInfos`, {
        userId,
        countryCode: selectedCountryCode,
        phoneNumber
      });
      Alert.alert('Success', 'Phone number saved successfully');
      router.push('/ClientDashboard');
    } catch (error) {
      console.error('Error saving phone number:', error);
      Alert.alert('Error', 'Failed to save phone number');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Numéro de téléphone</Text>

        <View style={styles.phoneContainer}>
          <TouchableOpacity style={styles.countryCodeInput} onPress={() => setCountryCodeModalVisible(true)}>
            <Text>{selectedCountryCode}</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.phoneInput}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Numéro de téléphone"
            keyboardType="phone-pad"
            onBlur={Keyboard.dismiss}
          />
        </View>

        <Modal animationType="slide" transparent={true} visible={countryCodeModalVisible} onRequestClose={() => setCountryCodeModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <FlatList
                data={countryCodes}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.modalItem} onPress={() => selectCountryCode(item.code)}>
                    <Text style={styles.itemText}>{item.flag} {item.code} ({item.country})</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity onPress={() => setCountryCodeModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={[styles.nextButton, { opacity: isFormComplete ? 1 : 0.5 }]} onPress={savePhoneNumber} disabled={!isFormComplete}>
          <FontAwesome5 name="arrow-right" size={24} color={white} />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    top: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: white,
    fontWeight: 'bold',
  },
  phoneContainer: {
    top: 100,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  countryCodeInput: {
    width: 80,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: darkGreen,
    borderRadius: 8,
    textAlign: 'center',
    marginRight: 10,
    top: 200
  },
  phoneInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: darkGreen,
    borderRadius: 8,
    top: 200,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    maxHeight: '50%',
    backgroundColor: white,
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: darkGreen,
  },
  itemText: {
    fontSize: 18,
    color: darkGreen,
  },
  closeButton: {
    padding: 10,
    alignSelf: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: darkGreen,
  },
  nextButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: darkGreen,
    width: 55,
    height: 55,
    borderRadius: 27.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ClientsInfos;
