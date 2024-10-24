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

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
