import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { green, darkGreen, white } from './Constants'; // Assurez-vous que le chemin est correct
import { FontAwesome5 } from '@expo/vector-icons';

const ClientDashboard = ({ navigation }) => {
  const initialRegion = {
    latitude: 5.3453, // Latitude pour Abidjan
    longitude: -4.0240, // Longitude pour Abidjan
    latitudeDelta: 0.0922, // Zoom
    longitudeDelta: 0.0421, // Zoom
  };

  return (
    <View style={styles.container}>
      {/* Icône de menu */}
      <TouchableOpacity
        style={styles.menuIcon}
        onPress={() => navigation.navigate('MenuHome')}
      >
        <FontAwesome5 name="bars" size={24} color={darkGreen} />
      </TouchableOpacity>

      {/* Carte */}
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
      >
        <Marker
          coordinate={{ latitude: 5.3453, longitude: -4.0240 }}
          title="Artisan"
          description="Un artisan disponible"
        />
      </MapView>

      {/* Zone de choix */}
      <View style={styles.overlay}>
        <Text style={styles.title}>Choisissez un Artisan</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Voir les Artisans Disponibles</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  menuIcon: {
    position: 'absolute',
    top: 60, // Ajustez selon la position voulue
    left: 20,
    zIndex: 10,
    backgroundColor: white, // Couleur de fond pour le cercle
    width: 55, // Largeur augmentée
    height: 55,
    borderRadius: 27.5, // Rayon pour un cercle parfait
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1, // Ajout d’une bordure pour plus de contraste
    borderColor: darkGreen,
    shadowColor: "#000", // Couleur de l’ombre
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, // Intensité de l’ombre
    shadowRadius: 3.5,
    elevation: 8, // Ombre pour appareils Android
  },
  map: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: darkGreen,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: white,
    marginBottom: 10,
  },
  button: {
    backgroundColor: green,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: white,
    fontWeight: 'bold',
  },
});

export default ClientDashboard;
