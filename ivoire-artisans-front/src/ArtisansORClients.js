import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { darkGreen } from './Constants';

const ArtisansORClients = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisissez votre rôle</Text>
      
      {/* Zone de fond darkGreen pour les options */}
      <View style={styles.optionsBackground}>
        {/* Artisan */}
        <TouchableOpacity
          style={styles.choiceContainer}
          onPress={() => navigation.navigate('ArtisansDashboard')}
        >
          <FontAwesome5 name="tools" size={60} color="black" />
          <Text style={styles.choiceText}>Je suis un Artisan</Text>
        </TouchableOpacity>

        {/* Client */}
        <TouchableOpacity
          style={styles.choiceContainer}
          onPress={() => navigation.navigate('ClientDashboard')}
        >
          <FontAwesome5 name="user" size={60} color="black" />
          <Text style={styles.choiceText}>Je suis un Client</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionsBackground: {
    backgroundColor: darkGreen,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  choiceContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
    elevation: 5,
  },
  choiceText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ArtisansORClients;
