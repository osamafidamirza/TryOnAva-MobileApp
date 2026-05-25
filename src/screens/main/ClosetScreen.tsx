import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../../theme';

export default function ClosetScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>👗</Text>
      <Text style={styles.title}>My Closet</Text>
      <Text style={styles.subtitle}>Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 48, marginBottom: 16 },
  title: { ...typography.h2, color: colors.text, fontWeight: '700', marginBottom: 8 },
  subtitle: { ...typography.p1, color: colors.subtext },
});
