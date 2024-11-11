import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { darkGreen, white } from './Constants';

const SettingsArtisans: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false);
  const toggleNotifications = () => setNotificationsEnabled(previousState => !previousState);
  const toggleTwoFactor = () => setTwoFactorEnabled(previousState => !previousState);

  const router = useRouter();

  // Handle password change
  const handleChangePassword = () => {
    Alert.alert('Change Password', 'This feature will allow you to change your password.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Enable Notifications */}
      <View style={styles.settingItem}>
        <Text style={styles.label}>Enable Notifications</Text>
        <Switch
          trackColor={{ false: '#767577', true: darkGreen }}
          thumbColor={notificationsEnabled ? white : '#f4f3f4'}
          onValueChange={toggleNotifications}
          value={notificationsEnabled}
        />
      </View>

      {/* Subscription Plan */}
      <View style={styles.settingItem}>
        <Text style={styles.label}>Subscription Plan</Text>
        <Text style={styles.info}>[Current Plan]</Text>
      </View>

      {/* Language Setting */}
      <View style={styles.settingItem}>
        <Text style={styles.label}>Language</Text>
        <Text style={styles.info}>English</Text>
      </View>

      {/* Two-Factor Authentication */}
      <View style={styles.settingItem}>
        <Text style={styles.label}>Enable Two-Factor Authentication</Text>
        <Switch
          trackColor={{ false: '#767577', true: darkGreen }}
          thumbColor={twoFactorEnabled ? white : '#f4f3f4'}
          onValueChange={toggleTwoFactor}
          value={twoFactorEnabled}
        />
      </View>

      {/* Change Password */}
      <TouchableOpacity style={styles.settingItem} onPress={handleChangePassword}>
        <Text style={styles.label}>Change Password</Text>
        <Text style={styles.info}>Tap to change password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: darkGreen,
    marginBottom: 30,
    top: 40,
    right: -120,
  },
  settingItem: {
    top: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 18,
    color: darkGreen,
  },
  info: {
    fontSize: 16,
    color: 'black',
  },
});

export default SettingsArtisans;
