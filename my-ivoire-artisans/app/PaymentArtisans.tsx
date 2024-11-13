import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { darkGreen, white } from './Constants';

const PaymentSettings: React.FC = () => {
  const [isOrangeMoneyModalVisible, setOrangeMoneyModalVisible] = useState(false);
  const [isBankAccountModalVisible, setBankAccountModalVisible] = useState(false);
  const [orangeMoneyNumber, setOrangeMoneyNumber] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [iban, setIban] = useState('');

  // Handle Orange Money form submission
  const handleOrangeMoneySubmit = () => {
    if (!orangeMoneyNumber) {
      Alert.alert('Error', 'Please enter a valid Orange Money number.');
      return;
    }

    // Here, you would send the data to your backend
    Alert.alert('Success', 'Orange Money account has been added successfully.');
    setOrangeMoneyModalVisible(false);
  };

  // Handle Bank Account form submission
  const handleBankAccountSubmit = () => {
    if (!bankAccountNumber || !iban) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    // Here, you would send the data to your backend
    Alert.alert('Success', 'Bank account has been added successfully.');
    setBankAccountModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}> </Text>

      {/* Orange Money Account */}
      <View style={styles.paymentOption}>
        <Text style={styles.label}>Orange Money</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setOrangeMoneyModalVisible(true)}
        >
          <Text style={styles.buttonText}>Add Orange Money Account</Text>
        </TouchableOpacity>
      </View>

      {/* Bank Account */}
      <View style={styles.paymentOption}>
        <Text style={styles.label}>Bank Account</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setBankAccountModalVisible(true)}
        >
          <Text style={styles.buttonText}>Add Bank Account</Text>
        </TouchableOpacity>
      </View>

      {/* Ivoire Artisans Money Account */}
      <View style={styles.paymentOption}>
        <Text style={styles.label}>Ivoire Artisans Money</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add Ivoire Artisans Money</Text>
        </TouchableOpacity>
      </View>

      {/* Orange Money Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOrangeMoneyModalVisible}
        onRequestClose={() => setOrangeMoneyModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Add Orange Money Account</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Orange Money Number"
              value={orangeMoneyNumber}
              onChangeText={setOrangeMoneyNumber}
              placeholderTextColor='black'
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleOrangeMoneySubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setOrangeMoneyModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bank Account Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isBankAccountModalVisible}
        onRequestClose={() => setBankAccountModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Add Bank Account</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Bank Account Number"
              value={bankAccountNumber}
              onChangeText={setBankAccountNumber}
              placeholderTextColor='black'
            />
            <TextInput
              style={styles.input}
              placeholder="Enter IBAN"
              value={iban}
              onChangeText={setIban}
              placeholderTextColor= 'black'
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleBankAccountSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setBankAccountModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: darkGreen,
    marginBottom: 30,
    top: 30,
    right:-70,
  },
  paymentOption: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    top: 40,
  },
  label: {
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
  },
  button: {
    backgroundColor: darkGreen,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: white,
    textAlign: 'center',
    fontSize: 16,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: white,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: darkGreen,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,

  },
  modalButton: {
    backgroundColor: darkGreen,
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
  },
});

export default PaymentSettings;
