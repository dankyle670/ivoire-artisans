import React, { ReactNode } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

type BackgroundProps = {
  children: ReactNode;
};

// Background component with image background
const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/assetss/leaves.jpg')}
        style={styles.image}
      />
      <View style={styles.overlay}>
        {children}
      </View>
    </View>
  );
};

// Custom styles for Background
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Background;
