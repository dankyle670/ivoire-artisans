// app/Home.tsx
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Background from './Home_bg';
import Btn from './Btn';
import { darkGreen } from './Constants';
import { useRouter } from "expo-router";

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.text}>Ivoire Artisans</Text>
        <View style={styles.Btn}>
          <Btn
            bgColor={darkGreen}
            textColor="white"
            btnLabel="Login"
            Press={() => router.push("/Login")}
          />
          <Btn
            bgColor="white"
            textColor={darkGreen}
            btnLabel="Signup"
            Press={() => router.push("/Signup")}
          />
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  text: {
    color: darkGreen,
    fontSize: 64,
    position: 'absolute',
    top: 50,
    left: 20,
  },
  Btn: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 40,
    left: 30,
  },
});

export default Home;
