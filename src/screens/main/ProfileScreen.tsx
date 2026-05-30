import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  SafeAreaView, Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { RootState } from '../../store';
import { colors, typography, spacing } from '../../theme';
import ConfirmModal from '../../components/ConfirmModal';
import { userApi } from '../../api/user';

const logoutIcon = require('../../assets/images/profile-logout.png');
const deleteIcon = require('../../assets/images/profile-delete.png');

type SubScreen = 'edit-profile' | 'notifications' | 'privacy' | 'terms' | 'edit-style';

interface Props {
  onLogout: () => void;
  onNavigate: (screen: SubScreen) => void;
}

const MENU_ITEMS = [
  { key: 'edit',          label: 'Edit Profile',          icon: require('../../assets/images/profile-edit.png'),         danger: false },
  { key: 'notifications', label: 'Notification Settings', icon: require('../../assets/images/profile-notification.png'), danger: false },
  { key: 'privacy',       label: 'Privacy & Policy',      icon: require('../../assets/images/profile-privacy.png'),      danger: false },
  { key: 'terms',         label: 'Terms & Conditions',    icon: require('../../assets/images/profile-term.png'),         danger: false },
  { key: 'style',         label: 'Edit Style',            icon: require('../../assets/images/profile-edit-style.png'), danger: false },
  { key: 'delete',        label: 'Delete Account',        icon: require('../../assets/images/profile-delete.png'),       danger: true  },
  { key: 'logout',        label: 'Log Out',               icon: require('../../assets/images/profile-logout.png'),       danger: false },
];

export default function ProfileScreen({ onLogout, onNavigate }: Props) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleLogout = async () => {
    setShowLogoutModal(false);
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('user');
    dispatch(logout());
    onLogout();
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      await userApi.deleteMe();
    } catch {}
    setShowDeleteModal(false);
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('user');
    dispatch(logout());
    onLogout();
    setDeleting(false);
  };

  const handlePress = (key: string) => {
    switch (key) {
      case 'logout': setShowLogoutModal(true); break;
      case 'delete': setShowDeleteModal(true); break;
      case 'edit':   onNavigate('edit-profile'); break;
      case 'notifications': onNavigate('notifications'); break;
      case 'privacy': onNavigate('privacy'); break;
      case 'terms':  onNavigate('terms'); break;
      case 'style':  onNavigate('edit-style'); break;
    }
  };

  const avatarSource = user?.avatar ? { uri: user.avatar } : null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.dotsContainer}>
            <View style={[styles.dot, { top: 8,  left: 60  }]} />
            <View style={[styles.dot, { top: 20, left: 100 }]} />
            <View style={[styles.dot, { top: 4,  right: 55 }]} />
            <View style={[styles.dot, { top: 35, right: 30 }]} />
            <View style={[styles.dot, { bottom: 20, left: 40  }]} />
            <View style={[styles.dot, { bottom: 10, right: 60 }]} />
          </View>
          <View style={styles.avatarCircle}>
            {avatarSource
              ? <Image source={avatarSource} style={styles.avatarImage} />
              : <Text style={styles.avatarInitial}>
                  {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
                </Text>
            }
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
                <Image
                  source={item.icon}
                  style={[styles.iconImg, item.danger && styles.iconImgDanger]}
                  resizeMode="cover"
                />
              </View>
              <Text style={[styles.menuLabel, item.danger && styles.menuLabelDanger]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>

      <ConfirmModal
        visible={showLogoutModal}
        icon={logoutIcon}
        title="Logging out?"
        confirmLabel="Yes, Log out"
        confirmDanger={false}
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutModal(false)}
      />

      <ConfirmModal
        visible={showDeleteModal}
        icon={deleteIcon}
        title="Delete Account?"
        confirmLabel={deleting ? '...' : 'Yes, Delete'}
        confirmDanger
        onConfirm={handleDeleteAccount}
        onCancel={() => setShowDeleteModal(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1 },

  avatarSection: {
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    position: 'relative',
    height: 160,
    justifyContent: 'center',
  },
  dotsContainer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
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
    overflow: 'hidden',
  },
  avatarImage: { width: 110, height: 110, borderRadius: 55 },
  avatarInitial: { fontSize: 44, fontWeight: '700', color: colors.primary },

  name: {
    ...typography.h1, color: colors.text, fontWeight: '700',
    textAlign: 'center', marginBottom: spacing.xs,
  },
  email: {
    ...typography.p2, color: colors.subtext,
    textAlign: 'center', marginBottom: spacing.xl,
  },

  menuList: { paddingHorizontal: spacing.lg, gap: spacing.sm },
  menuRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 14, padding: spacing.md,
    borderWidth: 1, borderColor: colors.stroke,
    gap: spacing.md,
  },
  iconCircle: {
    width: 68, height: 68, borderRadius: 34,
    alignItems: 'center', justifyContent: 'center',
    overflow: 'hidden',
  },
  iconCircleDanger: {},
  iconImg: { width: 68, height: 68 },
  iconImgDanger: {},
  menuLabel: { ...typography.p1, color: colors.text, fontWeight: '500' },
  menuLabelDanger: { color: colors.error },
});
