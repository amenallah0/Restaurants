import React, { createContext, useState, useEffect, useContext } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig'; // Import Firebase Auth
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signUp = async (email, password, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      // Update user profile if needed,
      console.log('User created:', userCredential.user);
      setUser(userCredential.user);
    } catch (error) {
      throw error;
    }
  };

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      setUser(userCredential.user);
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
