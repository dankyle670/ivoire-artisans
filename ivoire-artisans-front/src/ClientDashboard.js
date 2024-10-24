import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { green, darkGreen, white } from './Constants'; // Assurez-vous que le chemin est correct

const ClientDashboard = () => {
  const initialRegion = {
    latitude: 37.78825, // Latitude par défaut
    longitude: -122.4324, // Longitude par défaut
    latitudeDelta: 0.0922, // Zoom
    longitudeDelta: 0.0421, // Zoom
  };

  return (
    <View style={styles.container}>
      {/* Carte */}
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
      >
        {/* Exemple de marqueur (pour un artisan) */}
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="Artisan"
          description="Un artisan disponible"
        />
      </MapView>

      {/* Zone de choix */}
      <View style={styles.overlay}>
        <Text style={styles.title}>Choisissez un Artisan</Text>
        {/* Ajouter d'autres options ou fonctionnalités ici */}
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
