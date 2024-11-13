import React, { ReactNode, useState } from 'react';
import { View, ImageBackground, StyleSheet, ActivityIndicator } from 'react-native';

type BackgroundProps = {
  children: ReactNode;
};

const Background: React.FC<BackgroundProps> = ({ children }) => {
  const [loading, setLoading] = useState(true); // State to handle loading status

  return (
    <View style={styles.container}>
      {/* Display loader while image is loading */}
      {loading && <ActivityIndicator size="large" color="white" style={styles.loader} />}
      <ImageBackground
        source={require('./assets/assetss/ivoire-artisanslogo.webp')}
        style={styles.image}
        onLoadEnd={() => setLoading(false)} // Set loading to false when image is loaded
      >
        {children}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }], // Center the loader
    zIndex: 1,
  },
});

export default Background;
