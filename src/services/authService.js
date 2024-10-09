import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_STORAGE_KEY = '@users';
const TOKEN_STORAGE_KEY = '@userToken';

const generateToken = () => {
  return 'token-' + Math.random().toString(36).substr(2, 9);
};

export const register = async (email, password) => {
  try {
    const existingUsersJSON = await AsyncStorage.getItem(USERS_STORAGE_KEY);
    const existingUsers = existingUsersJSON ? JSON.parse(existingUsersJSON) : [];

    if (existingUsers.some(user => user.email === email)) {
      throw new Error('User already exists');
    }

    const newUser = { email, password };
    const updatedUsers = [...existingUsers, newUser];

    await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));

    const token = generateToken();
    await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);

    return token;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const usersJSON = await AsyncStorage.getItem(USERS_STORAGE_KEY);
    const users = usersJSON ? JSON.parse(usersJSON) : [];

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const token = generateToken();
      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
      console.log('Login successful for user:', email);
      return token;
    } else {
      console.log('Login failed for user:', email);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const isAuthenticated = async () => {
  const token = await getToken();
  return !!token;
};