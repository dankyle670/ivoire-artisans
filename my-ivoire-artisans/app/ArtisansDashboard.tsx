import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { green, darkGreen, white, lightGray } from './Constants';

const ArtisansDashboard: React.FC = () => {
  const router = useRouter();
  const [region, setRegion] = useState<Region | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [messageCount, setMessageCount] = useState<number>(0);

  // Fetch location of user
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

  // Fetch message count from AsyncStorage
  useEffect(() => {
    const fetchMessageCount = async () => {
      const count = await AsyncStorage.getItem('messageCount');
      if (count) {
        setMessageCount(parseInt(count));
      }
    };

    fetchMessageCount();
  }, []);

  return (
    <View style={styles.container}>
      {/* Chat Icon with Message Count */}
      <TouchableOpacity
        style={styles.chatIconContainer}
        onPress={() => router.push('/ArtisansChat')} // Navigate to chat screen
      >
        <FontAwesome5 name="comments" size={44} color={'white'} />
        {messageCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{messageCount}</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Menu Icon */}
      <TouchableOpacity
        style={styles.menuIcon}
        onPress={() => router.push('/MenuHomeArtisans')}
      >
        <FontAwesome5 name="bars" size={24} color={darkGreen} />
      </TouchableOpacity>

      {/* Map */}
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

      {/* Selection Zone */}
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
  chatIconContainer: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: white,
    fontSize: 12,
    fontWeight: 'bold',
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
