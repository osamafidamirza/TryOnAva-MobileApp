import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Alert, SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { RootState } from '../../store';
import { colors, typography, spacing } from '../../theme';

interface Props {
  onLogout: () => void;
}

const MENU_ITEMS = [
  { key: 'edit',          label: 'Edit Profile',           icon: '✎', danger: false },
  { key: 'notifications', label: 'Notification Settings',  icon: '🔔', danger: false },
  { key: 'privacy',       label: 'Privacy & Policy',       icon: '🛡', danger: false },
  { key: 'terms',         label: 'Terms & Conditions',     icon: '◈', danger: false },
  { key: 'style',         label: 'Edit Style',             icon: '✦', danger: false },
  { key: 'delete',        label: 'Delete Account',         icon: '🗑', danger: true  },
  { key: 'logout',        label: 'Log Out',                icon: '⏻', danger: false },
];

export default function ProfileScreen({ onLogout }: Props) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    dispatch(logout());
    onLogout();
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: handleLogout },
      ],
    );
  };

  const handlePress = (key: string) => {
    switch (key) {
      case 'logout': handleLogout(); break;
      case 'delete': handleDeleteAccount(); break;
      default: break;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.dotsContainer}>
            {/* decorative dots */}
            <View style={[styles.dot, { top: 8,  left: 60  }]} />
            <View style={[styles.dot, { top: 20, left: 100 }]} />
            <View style={[styles.dot, { top: 4,  right: 55 }]} />
            <View style={[styles.dot, { top: 35, right: 30 }]} />
            <View style={[styles.dot, { bottom: 20, left: 40  }]} />
            <View style={[styles.dot, { bottom: 10, right: 60 }]} />
          </View>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitial}>
              {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
            </Text>
          </View>
        </View>

        {/* Name + Email */}
        <Text style={styles.name}>{user?.name ?? 'Guest'}</Text>
        <Text style={styles.email}>{user?.email ?? ''}</Text>

        {/* Menu Items */}
        <View style={styles.menuList}>
          {MENU_ITEMS.map(item => (
            <TouchableOpacity
              key={item.key}
              style={styles.menuRow}
              onPress={() => handlePress(item.key)}
              activeOpacity={0.7}>
              <View style={[styles.iconCircle, item.danger && styles.iconCircleDanger]}>
                <Text style={[styles.iconText, item.danger && styles.iconTextDanger]}>
                  {item.icon}
                </Text>
              </View>
              <Text style={[styles.menuLabel, item.danger && styles.menuLabelDanger]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1 },

  // Avatar section
  avatarSection: {
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    position: 'relative',
    height: 160,
    justifyContent: 'center',
  },
  dotsContainer: { ...StyleSheet.absoluteFillObject },
  dot: {
    position: 'absolute',
    width: 5, height: 5, borderRadius: 3,
    backgroundColor: colors.primary, opacity: 0.5,
  },
  avatarCircle: {
    width: 110, height: 110, borderRadius: 55,
    backgroundColor: colors.cardSecondary,
    borderWidth: 2, borderColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarInitial: { fontSize: 44, fontWeight: '700', color: colors.primary },

  // Name / Email
  name: {
    ...typography.h1, color: colors.text, fontWeight: '700',
    textAlign: 'center', marginBottom: spacing.xs,
  },
  email: {
    ...typography.p2, color: colors.subtext,
    textAlign: 'center', marginBottom: spacing.xl,
  },

  // Menu
  menuList: { paddingHorizontal: spacing.lg, gap: spacing.sm },
  menuRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 14, padding: spacing.md,
    borderWidth: 1, borderColor: colors.stroke,
    gap: spacing.md,
  },
  iconCircle: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: `${colors.primary}22`,
    alignItems: 'center', justifyContent: 'center',
  },
  iconCircleDanger: { backgroundColor: `${colors.error}22` },
  iconText: { fontSize: 16, color: colors.primary },
  iconTextDanger: { color: colors.error },
  menuLabel: { ...typography.p1, color: colors.text, fontWeight: '500' },
  menuLabelDanger: { color: colors.error },
});
