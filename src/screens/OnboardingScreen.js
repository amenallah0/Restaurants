import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { colors } from '../styles/colors';

const OnboardingScreen = ({ navigation }) => {
  const handleFinish = () => {
    navigation.replace('Login');
  };

  return (
    <Swiper loop={false} showsPagination={true}>
      <View style={styles.slide}>
        <Image source={require('../../assets/icon.png')} style={styles.image} />
        <Text style={styles.title}>Welcome to the App</Text>
        <Text style={styles.text}>Step 1: Introduction</Text>
      </View>
      <View style={styles.slide}>
        <Image source={require('../../assets/icon.png')} style={styles.image} />
        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.text}>Step 2: Sign Up</Text>
      </View>
      <View style={styles.slide}>
        <Image source={require('../../assets/icon.png')} style={styles.image} />
        <Text style={styles.title}>Verify Your Email</Text>
        <Text style={styles.text}>Step 3: Verification</Text>
      </View>
      <View style={styles.slide}>
        <Image source={require('../../assets/icon.png')} style={styles.image} />
        <Text style={styles.title}>Set Up Your Profile</Text>
        <Text style={styles.text}>Step 4: Profile Setup</Text>
      </View>
      <View style={styles.slide}>
        <Image source={require('../../assets/icon.png')} style={styles.image} />
        <Text style={styles.title}>Get Started</Text>
        <Text style={styles.text}>Step 5: Final Steps</Text>
        <TouchableOpacity style={styles.button} onPress={handleFinish}>
          <Text style={styles.buttonText}>Finish</Text>
        </TouchableOpacity>
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: colors.secondary,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;