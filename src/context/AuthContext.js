import React, { createContext, useState, useEffect, useContext } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig'; 
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const signUp = async (email, password, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      await updateProfile(userCredential.user, { displayName: username });
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

  const updateUserProfile = async (profileData) => {
    try {
      if (user) {
        await updateProfile(user, {
          displayName: profileData.name,
          // Firebase Auth doesn't directly support email and phone updates in updateProfile
        });

        // Update email and phone in your database if needed
        // Example: await updateEmail(user, profileData.email);
        // Example: await updatePhoneNumber(user, profileData.phone);

        // Re-fetch the user data to ensure it's up-to-date
        await user.reload();
        const updatedUser = FIREBASE_AUTH.currentUser;
        setUser({ ...updatedUser, ...profileData });
      } else {
        console.error('User is not authenticated');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut, updateUserProfile, userToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
