import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import { darkGreen } from './Constants';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ArtisansORClients = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [isArtisan, setIsArtisan] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    // Récupérer l'userId stocké
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      setUserId(storedUserId);
    };
    fetchUserId();
  }, []);

  const updateRole = async (role: string) => {
    if (!userId) {
      console.error("User ID not found");
      return;
    }

    try {
      const apiUrl = 'https://ivoire-artisans-server.netlify.app';
      await axios.post(`${apiUrl}/api/updateRole`, {
        userId,
        role,
      });

      if (role === 'artisan') {
        setIsArtisan(true);
        setIsClient(false);
        router.push('/ArtisansInfos');
      } else {
        setIsClient(true);
        setIsArtisan(false);
        router.push('/ClientsInfos');
      }
    } catch (error) {
      console.error('Failed to update role:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisissez votre rôle</Text>
      <View style={styles.optionsBackground}>
        <TouchableOpacity
          style={styles.choiceContainer}
          onPress={() => updateRole('artisan')}
        >
          <FontAwesome5 name="tools" size={60} color="black" />
          <Text style={styles.choiceText}>Je suis un Artisan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.choiceContainer}
          onPress={() => updateRole('client')}
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
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    top: 70,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionsBackground: {
    top: 150,
    height: 600,
    backgroundColor: darkGreen,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    width: '80%',
  },
  choiceContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 70,
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
