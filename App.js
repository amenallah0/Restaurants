import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { AppTheme } from './src/styles/theme';

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer theme={AppTheme}>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;