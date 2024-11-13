import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

type BtnProps = {
  bgColor: string;
  btnLabel: string;
  textColor: string;
  Press: () => void;
};

const Btn: React.FC<BtnProps> = ({ bgColor, btnLabel, textColor, Press }) => {
  return (
    <TouchableOpacity
      onPress={Press}
      style={[styles.button, { backgroundColor: bgColor }]}
    >
      <Text style={[styles.text, { color: textColor }]}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 100,
    alignItems: 'center',
    width: 350,
    paddingVertical: 10,
    marginVertical: 0,
    bottom: 10,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default Btn;
