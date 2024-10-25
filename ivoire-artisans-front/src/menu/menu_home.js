import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {FontAwesome5, MaterialIcons} from '@expo/vector-icons';
import {darkGreen, white,} from '../Constants';

const MenuHome = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* closing icon */}
      <TouchableOpacity style={styles.closeIcon} onPress={() => navigation.goBack()}>
        <FontAwesome5 name="times" size={24} color={darkGreen} />
      </TouchableOpacity>

      {/* Photo de profil */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://placehold.co/100x100' }}
          style={styles.profileImage}
        />
        <Text style={styles.profileText}>Hello, Daniel K</Text>
      </View>

      {/* Options de menu */}
      <View style={styles.menuOptions}>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MyAccount')}>
          <FontAwesome5 name="user" size={24} color={darkGreen} />
          <Text style={styles.menuText}>My Account</Text>
        </TouchableOpacity>
      {/* Payment Settings */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PaymentSettings')}>
          <MaterialIcons name="payment" size={24} color={darkGreen} />
          <Text style={styles.menuText}>Payment Settings</Text>
        </TouchableOpacity>
      {/* settings */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
          <FontAwesome5 name="cog" size={24} color={darkGreen} />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>

         {/* help */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Help')}>
          <MaterialIcons name="help-outline" size={24} color={darkGreen} />
          <Text style={styles.menuText}>Help</Text>
        </TouchableOpacity>
         {/* Switch Profile */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('SwitchProfile')}>
          <FontAwesome5 name="exchange-alt" size={24} color={darkGreen} />
          <Text style={styles.menuText}>Switch Profile</Text>
        </TouchableOpacity>
         {/*  Contacts */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Contacts')}>
          <MaterialIcons name="contact-support" size={24} color={darkGreen} />
          <Text style={styles.menuText}>Contact</Text>
        </TouchableOpacity>

        {/* logout */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Logout')}>
          <FontAwesome5 name="sign-out-alt" size={24} color="red" />
          <Text style={styles.menuText}>Logout</Text>
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
  closeIcon: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    zIndex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: darkGreen,
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
    top: 100,
  },
  menuText: {
    fontSize: 18,
    marginLeft: 20,
    color: darkGreen,
  },
});

export default MenuHome;
