import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Background from './Home_bg';
import Btn from './Btn';
import { darkGreen, green } from './Constants';

//home screen!

const Home = (props) => {
  return (
    <Background>
        <View>
      <Text style={styles.text}>Ivoire Artisans</Text>
      <View style={styles.Btn}>
      <Btn bgColor={green} textColor='white' btnLabel="Login" Press={() => props.navigation.navigate("Login")} />
      <Btn bgColor='white' textColor={darkGreen} btnLabel="Signup" Press={() => props.navigation.navigate("Signup")} />
      </View>
      </View>
    </Background>
  );
}

// custom element of home screen

const styles = StyleSheet.create({
    text: {
        flex: 1,
        color: 'white',
        fontSize: 64,
        position: 'absolute',
        bottom: -200,
        left: 20

    },
    Btn: {
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: -800,
        left: 30
    }
})

export default Home;
