import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Toast from 'react-native-toast-message';

const RestaurantMenuScreen = ({ route }) => {
  const { restaurant } = route.params;
  const navigation = useNavigation();
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
    Toast.show({
      type: 'success',
      text1: 'Item Added',
      text2: `${item.name} has been added to your cart!`,
      position: 'bottom',
    });
  };

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItem}>
      <View style={styles.menuItemInfo}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemDescription}>{item.description}</Text>
        <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <Animatable.View animation="bounceIn" duration={1500}>
        <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
          <Ionicons name="add-circle" size={28} color={colors.primary} />
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{restaurant.name}</Text>
        <View style={styles.backButton} />
      </View>
      <ScrollView>
        <View style={styles.restaurantInfo}>
          <Image source={getImageSource(restaurant.image)} style={styles.restaurantImage} />
          <View style={styles.restaurantDetails}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
            <Text style={styles.restaurantAddress}>{restaurant.address}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color={colors.gold} />
              <Text style={styles.ratingText}>{restaurant.rating.toFixed(1)}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.menuTitle}>Menu</Text>
        <FlatList
          data={restaurant.menu}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.menuList}
          scrollEnabled={false}
        />
        <TouchableOpacity 
          style={styles.cartButton} 
          onPress={() => navigation.navigate('CartScreen', { cartItems: cart, setCartItems: setCart })}>
          <Text style={styles.cartButtonText}>View Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const getImageSource = (imageName) => {
  switch (imageName) {
    case 'pirate.jpg':
      return require('../../assets/pirate.jpg');
    case 'paranthese.jpg':
      return require('../../assets/paranthese.jpg');
    case 'chraka.jpg':
      return require('../../assets/chraka.jpg');
    case 'chandelier.jpg':
      return require('../../assets/chandelier.jpg');
    case 'badira.jpg':
      return require('../../assets/badira.jpg');
    default:
      return require('../../assets/icon.png');
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  backButton: {
    padding: 8,
    width: 40,
  },
  restaurantInfo: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  restaurantImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 16,
  },
  restaurantDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 4,
  },
  restaurantCuisine: {
    fontSize: 16,
    color: colors.primary,
    marginBottom: 4,
  },
  restaurantAddress: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: colors.secondary,
    fontWeight: 'bold',
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.secondary,
    marginTop: 16,
    marginLeft: 16,
    marginBottom: 8,
  },
  menuList: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderColor: colors.border,
    borderWidth: 1,
  },
  menuItemInfo: {
    flex: 1,
    marginRight: 16,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 8,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  addButton: {
    padding: 8,
  },
  cartButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
  },
  cartButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RestaurantMenuScreen;
