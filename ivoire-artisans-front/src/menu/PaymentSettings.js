import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { white, darkGreen } from '../Constants';

const PaymentSettings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>payment settings</Text>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: darkGreen,
  },
});

export default PaymentSettings;
