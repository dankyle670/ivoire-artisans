import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from 'react-native-elements';
import { white, darkGreen } from '../Constants';

 //Importation des avatars locaux
const avatars = [
  { id: 1, uri: require('../../assets/homme.png') },
  { id: 2, uri: require('../../assets/homme1.png') },
  { id: 3, uri: require('../../assets/homme-daffaire.png') },
  { id: 4, uri: require('../../assets/femme.png') },
  { id: 5, uri: require('../../assets/femme1.png') },
  { id: 6, uri: require('../../assets/femme2.png') },
];

const AvatarSelection = ({ navigation }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar.uri);
  };

  const saveAvatar = async () => {
    try {
      if (selectedAvatar) {
        await AsyncStorage.setItem('selectedAvatar', selectedAvatar);
        navigation.goBack(); // Retourne au menu après la sélection
      }
    } catch (e) {
      console.error("Erreur d'enregistrement de l'avatar", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisissez un avatar</Text>
      <FlatList
        data={avatars}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.avatarOption,
              item.uri === selectedAvatar && styles.selectedAvatar,
            ]}
            onPress={() => handleAvatarSelect(item)}
          >
            <Avatar
              rounded
              source={item.uri}
              size="medium"
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.avatarList}
        showsHorizontalScrollIndicator={false}
      />

      {/* Bouton de sélection */}
      <TouchableOpacity
        style={[styles.selectButton, !selectedAvatar && styles.disabledButton]} 
        onPress={saveAvatar}
        disabled={!selectedAvatar}
      >
        <Text style={styles.selectButtonText}>Sélectionner</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
    padding: 20,
  },
  title: {
    fontSize: 24,
    top: 50,
    fontWeight: 'bold',
    color: darkGreen,
    marginBottom: 20,
  },
  avatarList: {
    flexDirection: 'row',
    paddingVertical: 10,
    top: 70,
  },
  avatarOption: {
    padding: 10,
    borderRadius: 40,
  },
  selectedAvatar: {
    borderWidth: 2,
    borderColor: darkGreen,
  },
  selectButton: {
    marginTop: 20,
    backgroundColor: darkGreen,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  selectButtonText: {
    color: white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AvatarSelection;
