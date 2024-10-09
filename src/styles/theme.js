import { DefaultTheme } from '@react-navigation/native';
import { colors } from './colors';

export const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.white,
    text: colors.text,
    border: colors.border,
  },
};