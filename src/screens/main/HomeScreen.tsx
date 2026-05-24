import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { colors, typography, spacing } from '../../theme';

interface Props {
  onLogout: () => void;
}

export default function HomeScreen({ onLogout }: Props) {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    dispatch(logout());
    onLogout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen — Coming Soon</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  text: { ...typography.h1, color: colors.text, marginBottom: spacing.xl },
  button: {
    backgroundColor: colors.error, paddingHorizontal: spacing.xl,
    height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
  },
  buttonText: { ...typography.p1, color: colors.text, fontWeight: '700' },
});
