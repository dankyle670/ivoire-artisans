import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import Home from './src/Home';
import Login from './src/Login';
import Signup from './src/Signup';
import VerifyEmail from './src/VerifyEmail';
import ArtisansORClients from './src/ArtisansORClients';
import ClientDashboard from './src/ClientDashboard';
import MenuHome from './src/menu/menu_home';
import MyAccount from './src/menu/MyAccount';
import Settings from './src/menu/Settings';
import Help from './src/menu/Help';
import SwitchProfile from './src/menu/SwitchProfile';
import Contacts from './src/menu/Contacts';
import PaymentSettings from './src/menu/PaymentSettings';

// navigation

const Stack = createNativeStackNavigator();
const prefix = Linking.createURL('/');

const App = () => {
  const linking = {
    prefixes: [prefix, 'ivoireartisans://'],
    config: {
      screens: {
        Home: 'home',
        Login: 'login',
        Signup: 'signup',
        VerifyEmail: 'verify/email',
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
        <Stack.Screen name="ArtisansORClients" component={ArtisansORClients} />
        <Stack.Screen name="ClientDashboard" component={ClientDashboard} />
        <Stack.Screen name="MenuHome" component={MenuHome} />
        <Stack.Screen name="MyAccount" component={MyAccount} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="Contacts" component={Contacts} />
        <Stack.Screen name="SwitchProfile" component={SwitchProfile} />
        <Stack.Screen name="PaymentSettings" component={PaymentSettings} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
