import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { green, darkGreen, white } from './Constants';

const ArtisansDashboard: React.FC = () => {
  const router = useRouter();
  const [region, setRegion] = useState<Region | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg("Permission refusée");
        Alert.alert("Permission refusée", "L'accès à la localisation est nécessaire pour afficher les artisans autour de vous.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* Icône de menu */}
      <TouchableOpacity
        style={styles.menuIcon}
        onPress={() => router.push('/MenuHomeArtisans')}
      >
        <FontAwesome5 name="bars" size={24} color={darkGreen} />
      </TouchableOpacity>

      {/* Carte */}
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
      >
        {region && (
          <Marker
            coordinate={{ latitude: region.latitude, longitude: region.longitude }}
            title="Vous êtes ici"
            description="Position actuelle de l'artisan"
          />
        )}
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
    top: 60,
    left: 20,
    zIndex: 10,
    backgroundColor: white,
    width: 55,
    height: 55,
    borderRadius: 27.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: darkGreen,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
    elevation: 8,
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

export default ArtisansDashboard;
