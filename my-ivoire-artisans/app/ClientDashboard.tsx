import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, Modal } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { green, darkGreen, white } from './Constants';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ClientDashboard: React.FC = () => {
  const router = useRouter();
  const [location, setLocation] = useState<Region | null>(null);  // Map region
  const [userLocation, setUserLocation] = useState<Region | null>(null);  // User's actual location
  const [errorMsg, setErrorMsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [closestArtisan, setClosestArtisan] = useState(null);
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        Alert.alert(
          'Location Permission Required',
          'Please enable location permissions in settings to see available artisans nearby.'
        );
        return;
      }

      let locationResult = await Location.getCurrentPositionAsync({});
      const userRegion = {
        latitude: locationResult.coords.latitude,
        longitude: locationResult.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
      setLocation(userRegion);  // Set map region
      setUserLocation(userRegion);  // Save user location separately

      // Generate random artisan locations around user
      const generatedArtisans = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        latitude: userRegion.latitude + (Math.random() - 0.5) * 0.01,
        longitude: userRegion.longitude + (Math.random() - 0.5) * 0.01,
        name: `Artisan ${i + 1}`,
        specialty: ['Plumber', 'Electrician', 'Carpenter', 'Painter', 'Mason'][i % 20],
      }));
      setArtisans(generatedArtisans);
    })();
  }, []);

  const findNearestArtisan = () => {
    if (userLocation && artisans.length > 0) {
      const distances = artisans.map((artisan) => ({
        ...artisan,
        distance: Math.sqrt(
          Math.pow(artisan.latitude - userLocation.latitude, 2) +
          Math.pow(artisan.longitude - userLocation.longitude, 2)
        ),
      }));
      const nearest = distances.reduce((prev, curr) => (prev.distance < curr.distance ? prev : curr));
      setClosestArtisan(nearest);

      // Center map on the closest artisan with a closer zoom
      setLocation({
        latitude: nearest.latitude,
        longitude: nearest.longitude,
        latitudeDelta: 0.005,  // Smaller delta for closer zoom
        longitudeDelta: 0.005,
      });
      setShowModal(false);  // Automatically show modal for nearest artisan
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuIcon}
        onPress={() => router.push('/MenuHome')}
      >
        <FontAwesome5 name="bars" size={24} color={darkGreen} />
      </TouchableOpacity>

      <MapView
        style={styles.map}
        region={location}
        onRegionChangeComplete={(region) => setLocation(region)}
        showsUserLocation={true}
      >
        {artisans.map((artisan) => (
          <Marker
            key={artisan.id}
            coordinate={{ latitude: artisan.latitude, longitude: artisan.longitude }}
            title={artisan.name}
            description={artisan.specialty}
            onPress={() => {
              setClosestArtisan(artisan);
              setShowModal(true);
            }}
          />
        ))}
      </MapView>

      <View style={styles.overlay}>
        <Text style={styles.title}>Trouvez un Artisan</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={findNearestArtisan}
        >
          <Text style={styles.buttonText}>Artisan le plus proche !</Text>
        </TouchableOpacity>
      </View>

      {closestArtisan && (
        <Modal
          visible={showModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{closestArtisan.name}</Text>
              <Text style={styles.modalText}>Specialty: {closestArtisan.specialty}</Text>
              <TouchableOpacity
                style={styles.commandButton}
                onPress={() => {
                  setShowModal(false);
                  Alert.alert('Commande envoyée', `Vous avez commandé ${closestArtisan.name}`);
                }}
              >
                <Text style={styles.commandButtonText}>Commander l'artisan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.closeButtonText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: white,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: white,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  commandButton: {
    backgroundColor: darkGreen,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  commandButtonText: {
    color: white,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: white,
    fontWeight: 'bold',
  },
});

export default ClientDashboard;
