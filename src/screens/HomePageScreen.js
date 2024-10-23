import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/colors';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import Input from '../components/Input';
import restaurantData from "../../db.json";


const HomePage = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const { signOut } = useAuth();

  const fetchRestaurants = async () => {
    try {
      console.log('Fetching restaurants from local JSON file');
      await new Promise(resolve => setTimeout(resolve, 10000));
      console.log('Fetched restaurants:', restaurantData.restaurants);
      setRestaurants(restaurantData.restaurants);
      setFilteredRestaurants(restaurantData.restaurants);
      setError(null);
    } catch (error) {
      console.error('Error fetching restaurants:', error.message);
      setError(`Failed to fetch restaurants. ${error.message}`);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchRestaurants();
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <View style={styles.ratingContainer}>
        {[...Array(fullStars)].map((_, i) => (
          <Ionicons key={`full_${i}`} name="star" size={16} color={colors.gold} />
        ))}
        {halfStar && <Ionicons key="half" name="star-half" size={16} color={colors.gold} />}
        {[...Array(emptyStars)].map((_, i) => (
          <Ionicons key={`empty_${i}`} name="star-outline" size={16} color={colors.gold} />
        ))}
        <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
      </View>
    );
  };

  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.restaurantItem}
      onPress={() => navigation.navigate('RestaurantMenuScreen', { restaurant: item })}
    >
      <Image source={getImageSource(item.image)} style={styles.restaurantImage} />
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.restaurantCuisine}>{item.cuisine}</Text>
        {renderRatingStars(item.rating)}
        <Text style={styles.workingHours}>{item.workingHours}</Text>
        <Text style={styles.address}>{item.address}</Text>
      </View>
    </TouchableOpacity>
  );
  
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

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchRestaurants}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Restaurants</Text>
      </View>
      <Input
        placeholder="Search restaurants or cuisines"
        value={searchQuery}
        onChangeText={handleSearch}
        icon="search"
      />
      <FlatList
        data={searchQuery ? filteredRestaurants : restaurants}
        renderItem={renderRestaurantItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    padding: 8,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  logoutButton: {
    padding: 8,
  },
  logoutButtonText: {
    color: colors.secondary,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
  },
  restaurantItem: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderColor: colors.border,
    borderWidth: 1,
  },
  restaurantImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 4,
  },
  restaurantCuisine: {
    fontSize: 14,
    color: colors.primary,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: colors.secondary,
  },
  workingHours: {
    fontSize: 12,
    color: colors.text,
  },
  address: {
    fontSize: 12,
    color: colors.text,
    marginTop: 4,
  },
  errorText: {
    color: colors.error,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomePage;
