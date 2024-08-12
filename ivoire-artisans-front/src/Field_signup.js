import React from 'react';
import {TextInput} from 'react-native';
import {darkGreen} from './Constants';

// text input define function for sign up screen


const Field_signup = props => {
  return (
    <TextInput
      {...props}
      style={{borderRadius: 100, color: darkGreen, paddingHorizontal: 10, width: '78%', height: 30, backgroundColor: 'rgb(220,220, 220)', marginVertical: 10}}
      placeholderTextColor={darkGreen}></TextInput>
  );
};


export default Field_signup;

