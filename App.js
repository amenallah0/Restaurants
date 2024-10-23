import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { AppTheme } from './src/styles/theme';
import Toast from 'react-native-toast-message';


const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer theme={AppTheme}>
        <AppNavigator />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;