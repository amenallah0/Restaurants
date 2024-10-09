import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/colors';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const { signOut } = useAuth();
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const toggleNotifications = async () => {
    const newValue = !notifications;
    setNotifications(newValue);
    try {
      await AsyncStorage.setItem('notifications', JSON.stringify(newValue));
      console.log('Notifications toggled:', newValue);
    } catch (error) {
      console.error('Error saving notification preference:', error);
    }
  };
  
  const toggleDarkMode = async () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    try {
      await AsyncStorage.setItem('darkMode', JSON.stringify(newValue));
      console.log('Dark mode toggled:', newValue);
      // Apply dark mode theme here
      // You might want to use a context or Redux to manage the theme globally
    } catch (error) {
      console.error('Error saving dark mode preference:', error);
    }
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const renderSettingItem = (icon, title, value, onToggle) => (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={24} color={colors.primary} style={styles.settingIcon} />
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      <Switch
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor={value ? colors.white : colors.secondary}
        onValueChange={onToggle}
        value={value}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.sectionTitle}>Preferences</Text>
        {renderSettingItem('notifications', 'Push Notifications', notifications, toggleNotifications)}
        {renderSettingItem('moon', 'Dark Mode', darkMode, toggleDarkMode)}
        
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.settingItem} onPress={handleEditProfile}>
          <View style={styles.settingLeft}>
            <Ionicons name="person" size={24} color={colors.primary} style={styles.settingIcon} />
            <Text style={styles.settingTitle}>Edit Profile</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.secondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={handleChangePassword}>
          <View style={styles.settingLeft}>
            <Ionicons name="lock-closed" size={24} color={colors.primary} style={styles.settingIcon} />
            <Text style={styles.settingTitle}>Change Password</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.secondary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.settingItem, styles.logoutButton]} onPress={signOut}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 15,
  },
  settingTitle: {
    fontSize: 16,
    color: colors.text,
  },
  logoutButton: {
    marginTop: 20,
    justifyContent: 'center',
  },
  logoutText: {
    color: colors.error,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;