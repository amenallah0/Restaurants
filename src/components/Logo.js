import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => {
  return (
    <Image
    source={require('../../assets/welcome.png')}
    style={styles.logo}
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 250,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default Logo;