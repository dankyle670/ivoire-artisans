import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { darkGreen } from './Constants';

interface FieldLoginProps extends TextInputProps {
  // You can add any additional props specific to Field_login here if needed
}

// Text input define function for login screen
const Field_login: React.FC<FieldLoginProps> = (props) => {
  return (
    <TextInput
      {...props}
      style={{
        borderRadius: 100,
        color: 'black',
        paddingHorizontal: 10,
        width: '78%',
        height: 40, // Increased height for better usability
        backgroundColor: 'rgb(220,220, 220)',
        marginVertical: 10,
      }}
      placeholderTextColor='black'
    />
  );
};

export default Field_login;
