import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false}}>
      <Stack.Screen name="index" />
      <Stack.Screen name="Home" options={{ gestureEnabled: false }} />
      <Stack.Screen name="Signup" />
      <Stack.Screen name="Login" />
      <Stack.Screen name="ArtisansORClients" />
      <Stack.Screen name="ClientsInfos" />
      <Stack.Screen name="ArtisansInfos" />
      <Stack.Screen name="ClientDashboard" />
      <Stack.Screen name="ArtisansDashboard" />
      <Stack.Screen name="MenuHome" />
      <Stack.Screen name="MenuHomeArtisans" />
      <Stack.Screen name="PaymentArtisans" />
      <Stack.Screen name="SettingsArtisans" />
      <Stack.Screen name="ArtisansSubscriptionOffers" />
      <Stack.Screen name="ArtisansChat" />
      <Stack.Screen name="ArtisansContact" />
      <Stack.Screen name="ArtisansFAQ" />
      <Stack.Screen name="MyAccountArtisans" />

      <Stack.Screen name="MyAccount" />
    </Stack>
  );
}
