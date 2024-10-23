import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../styles/colors';
import { Ionicons } from '@expo/vector-icons';

const ReservationScreen = ({ route }) => {
  const { reservationTime, numberOfPeople } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reservation Details</Text>
      <View style={styles.detailContainer}>
        <Ionicons name="time" size={24} color={colors.secondary} style={styles.detailIcon} />
        <Text style={styles.detail}>Time: {reservationTime}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Ionicons name="people" size={24} color={colors.secondary} style={styles.detailIcon} />
        <Text style={styles.detail}>Number of People: {numberOfPeople}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 30,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '90%',
  },
  detailIcon: {
    marginRight: 10,
  },
  detail: {
    fontSize: 20,
    color: colors.text,
  },
});

export default ReservationScreen;
