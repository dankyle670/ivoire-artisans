import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { white, darkGreen } from '../Constants';

const Contacts = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts</Text>
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

export default Contacts;
