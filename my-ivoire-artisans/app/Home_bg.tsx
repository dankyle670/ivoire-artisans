import React, { ReactNode } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

type BackgroundProps = {
  children: ReactNode;
};

// Background component with image background
const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <ImageBackground
      source={require('./assets/assetss/ivoire-artisanslogo.webp')}
      style={styles.image}
    >
      {children}
    </ImageBackground>
  );
};

// Custom styles for Background
const styles = StyleSheet.create({
  image: {
    flex: 1, // Make the image cover the entire container
    justifyContent: 'center', // Optional, to center children
  },
});

export default Background;
