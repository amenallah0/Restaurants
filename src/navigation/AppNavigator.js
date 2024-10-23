import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomePageScreen from '../screens/HomePageScreen';
import BottomTabNavigator from './BottomTabNavigator';
import RestaurantMenuScreen from '../screens/RestaurantMenuScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import CartScreen from '../screens/CartScreen';
import ReservationScreen from '../screens/ReservationScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user && <Stack.Screen name="Onboarding" component={OnboardingScreen} />}
      {user ? (
        <>
          <Stack.Screen name="Main" component={BottomTabNavigator} />
          <Stack.Screen name="HomePage" component={HomePageScreen} />
          <Stack.Screen name="RestaurantMenuScreen" component={RestaurantMenuScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
          <Stack.Screen name="ReservationScreen" component={ReservationScreen} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
