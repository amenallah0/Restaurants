import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, logout, register, getToken } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const storedToken = await getToken();
        setUserToken(storedToken);
      } catch (e) {
        console.error('Failed to load token', e);
      }
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  const authContext = {
    signIn: async (email, password) => {
      try {
        const token = await login(email, password);
        setUserToken(token);
        await AsyncStorage.setItem('userToken', token);
      } catch (error) {
        console.error('Sign in error:', error);
        throw error;
      }
    },
    signOut: async () => {
      try {
        await logout();
        setUserToken(null);
        await AsyncStorage.removeItem('userToken');
      } catch (error) {
        console.error('Sign out error:', error);
      }
    },
    signUp: async (email, password) => {
      try {
        const token = await register(email, password);
        setUserToken(token);
        await AsyncStorage.setItem('userToken', token);
      } catch (error) {
        console.error('Sign up error:', error);
        throw error;
      }
    },
    userToken,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);