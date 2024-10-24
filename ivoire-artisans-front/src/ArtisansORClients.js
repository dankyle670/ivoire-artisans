import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { darkGreen } from './Constants'; // Assurez-vous que le chemin est correct

const ArtisansORClients = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisissez votre rôle</Text>
      
      {/* Zone de fond darkGreen pour les options */}
      <View style={styles.optionsBackground}>
        {/* Option pour Artisan */}
        <TouchableOpacity
          style={styles.choiceContainer}
          onPress={() => navigation.navigate('ArtisansDashboard')}
        >
          <FontAwesome5 name="tools" size={60} color="black" />
          <Text style={styles.choiceText}>Je suis un Artisan</Text>
        </TouchableOpacity>

        {/* Option pour Client */}
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
    backgroundColor: '#f2f2f2', // Couleur de fond par défaut
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionsBackground: {
    backgroundColor: darkGreen, // Couleur du fond darkGreen
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
    width: '100%', // S'assurer que le choix occupe toute la largeur disponible
    elevation: 5, // Pour donner un effet d'ombre
  },
  choiceText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ArtisansORClients;
