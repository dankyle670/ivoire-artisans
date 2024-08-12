import React from 'react';
import {View, Text, Touchable, TouchableOpacity, StyleSheet} from 'react-native';
import Background from './Home_bg';
import Btn from './Btn';
import {darkGreen} from './Constants';
import Field_login from './Field_login';

const Login = (props) => {
  return (
    <Background>
      <View style={{alignItems: 'center', width: 390}}>
        <Text style={{ color: 'white', fontSize: 64, fontWeight: 'bold', marginVertical: 20,}}>
          Login
        </Text>
        <View style={{ backgroundColor: 'white', height: 700, width: 460, borderTopLeftRadius: 130, paddingTop: 100, alignItems: 'center',}}>
          <Text style={{fontSize: 40, color: darkGreen, fontWeight: 'bold'}}>
            Welcome Back
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Login to your account
          </Text>
          <Field_login
            placeholder="Email / Username"
            keyboardType={'email-address'}
          />
          <Field_login placeholder="Password" secureTextEntry={true} />
          <View
            style={{alignItems: 'flex-end', width: '78%', paddingRight: 16, marginBottom: 300}}>
            <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
              Forgot Password ?
            </Text>
          </View>
          <Btn textColor='white' bgColor={darkGreen} btnLabel="Login" Press={() => alert("Logged In")} />
          <View style={{ display: 'flex', flexDirection :'row', justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight:"bold" }}>Don't have an account ? </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};


const styles = StyleSheet.create({
    log: {
        flex: 1,
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

export default Login;
