import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { white, darkGreen } from './Constants';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Artisan = {
  id: number;
  name: string;
};

type CountryCode = {
  code: string;
  country: string;
  flag: string;
};

const artisansList: Artisan[] = [
  { id: 1, name: 'Maçon' },
  { id: 2, name: 'Plombier' },
  { id: 3, name: 'Électricien' },
  { id: 4, name: 'Menuisier' },
  { id: 5, name: 'Peintre' },
];

const countryCodes: CountryCode[] = [
  { code: '+225', country: 'Côte d\'Ivoire', flag: '🇨🇮' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+1', country: 'États-Unis', flag: '🇺🇸' },
  { code: '+91', country: 'Inde', flag: '🇮🇳' },
];

const ArtisansInfos = () => {
  const [selectedArtisan, setSelectedArtisan] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [countryCodeModalVisible, setCountryCodeModalVisible] = useState(false);
  const [document, setDocument] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('+225');
  const [userId, setUserId] = useState<string | null>(null);

  const router = useRouter();

  // Fetch user ID from AsyncStorage
  useEffect(() => {
    const getUserId = async () => {
      const id = await AsyncStorage.getItem('userId');
      setUserId(id);
    };
    getUserId();
  }, []);

  const selectArtisan = (artisan: Artisan) => {
    setSelectedArtisan(artisan.id);
    setModalVisible(false);
  };

  const selectCountryCode = (code: string) => {
    setSelectedCountryCode(code);
    setCountryCodeModalVisible(false);
  };

  const uploadDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      setDocument(result);
      Alert.alert('Document sélectionné', `Vous avez sélectionné: ${result.name}`);
    }
  };

  const isFormComplete = selectedArtisan !== null && phoneNumber.length > 0;

  const submitArtisanInfo = async () => {
    // Check if the phone number, country code, and artisan type are provided
    if (!phoneNumber || !selectedCountryCode || !selectedArtisan) {
      Alert.alert("Erreur", "Veuillez remplir toutes les informations nécessaires.");
      return;
    }

    const formData = {
      userId,
      countryCode: selectedCountryCode,
      phoneNumber,
      artisanType: selectedArtisan ? artisansList.find(item => item.id === selectedArtisan)?.name : null,
    };

    // Log the formData to ensure the data is correct
    console.log('Form Data being sent:', formData);

    try {
      const response = await fetch('https://ivoire-artisans-server.netlify.app/api/saveInfos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check the response status and handle accordingly
      if (response.ok) {
        const responseData = await response.json();
        console.log('Server Response:', responseData);

        Alert.alert('Succès', 'Vos informations ont été enregistrées.');
        router.push('/ArtisansDashboard');
      } else {
        const errorData = await response.json();
        console.log('Error response from server:', errorData);
        Alert.alert('Erreur', errorData.message || 'Une erreur est survenue lors de l’enregistrement.');
      }
    } catch (error) {
      console.error('Error during fetch request:', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion au serveur.');
    }
  };



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Choisissez un type d'artisan</Text>

        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>
            {selectedArtisan ? artisansList.find(item => item.id === selectedArtisan)?.name : 'Sélectionnez un métier'}
          </Text>
        </TouchableOpacity>

        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <FlatList
                data={artisansList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.modalItem} onPress={() => selectArtisan(item)}>
                    <Text style={styles.itemText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.button} onPress={uploadDocument}>
          <Text style={styles.buttonText}>
            {document ? `Document: ${document.name}` : 'Téléchargez votre certificat'}
          </Text>
        </TouchableOpacity>

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

        <TouchableOpacity
          style={[styles.nextButton, { opacity: isFormComplete ? 1 : 0.5 }]}
          onPress={submitArtisanInfo} // Now triggers the form submission and navigation
          disabled={!isFormComplete}
        >
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
  button: {
    top: 70,
    backgroundColor: darkGreen,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
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
  },
  phoneInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: darkGreen,
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: white,
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalItem: {
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: darkGreen,
  },
  nextButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: darkGreen,
    padding: 15,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ArtisansInfos;
