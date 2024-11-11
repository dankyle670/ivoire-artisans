import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { darkGreen, white } from './Constants';

const MyAccount: React.FC = () => {
  const router = useRouter();

  const userInfo = {
    name: 'Daniel Komoe',
    email: 'johndoe@example.com',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}></Text>

      {/* Informations utilisateur */}
      <View style={styles.userInfo}>
        <FontAwesome5 name="user-circle" size={80} color={darkGreen} style={styles.avatar} />
        <Text style={styles.name}>{userInfo.name}</Text>
        <Text style={styles.email}>{userInfo.email}</Text>
      </View>

      {/* Menu Options */}
      <View style={styles.menuOptions}>

        {/* Edit Profile */}
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/')}>
          <FontAwesome5 name="edit" size={24} color="black" />
          <Text style={styles.menuText}>Modifier le profil</Text>
        </TouchableOpacity>

        {/* Order History */}
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/')}>
          <FontAwesome5 name="history" size={24} color="black" />
          <Text style={styles.menuText}>Historique des commandes</Text>
        </TouchableOpacity>

        {/* Mes avis */}
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/')}>
          <FontAwesome5 name="star" size={24} color="black" />
          <Text style={styles.menuText}>Mes avis</Text>
        </TouchableOpacity>

        {/* Référencement et Parrainage */}
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/')}>
          <FontAwesome5 name="user-plus" size={24} color="black" />
          <Text style={styles.menuText}>Référencement et Parrainage</Text>
        </TouchableOpacity>

        {/* Sécurité */}
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/')}>
          <FontAwesome5 name="shield-alt" size={24} color="black" />
          <Text style={styles.menuText}>Sécurité</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: darkGreen,
    textAlign: 'center',
    marginBottom: 20,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: darkGreen,
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
  menuOptions: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  menuText: {
    fontSize: 18,
    marginLeft: 20,
    color: 'black',
  },
});

export default MyAccount;
