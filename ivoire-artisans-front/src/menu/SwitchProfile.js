import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { white, darkGreen } from '../Constants';

const SwitchProfile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SwitchProfile</Text>
    
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

export default SwitchProfile;
