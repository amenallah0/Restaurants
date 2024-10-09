import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';
import CustomModal from '../components/CustonModal';
import { validateEmail, validatePassword } from '../utils/validation';
import { colors } from '../styles/colors';
import { useAuth } from '../context/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });

  const { signUp } = useAuth();

  const showModal = (title, message, action) => {
    setModalContent({ title, message, action });
    setModalVisible(true);
  };

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      showModal('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      showModal('Invalid Password', 'Password must be at least 8 characters long and contain at least one number and one special character.');
      return;
    }

    if (password !== confirmPassword) {
      showModal('Password Mismatch', 'Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      await signUp(email, password);
      showModal('Success', 'Registration successful. Please log in.', () => navigation.navigate('Login'));
    } catch (error) {
      showModal('Registration Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Logo />
        <Text style={styles.title}>Create Account</Text>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          icon="mail"
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          icon="lock"
        />
        <Input
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          icon="lock"
        />
        <Button 
          title="Register" 
          onPress={handleRegister}
          isLoading={isLoading}
        />
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <CustomModal
        visible={modalVisible}
        title={modalContent.title}
        message={modalContent.message}
        onClose={() => setModalVisible(false)}
        onAction={modalContent.action}
        actionText={modalContent.action ? 'OK' : null}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loginText: {
    color: colors.text,
  },
  loginLink: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});
export default RegisterScreen;