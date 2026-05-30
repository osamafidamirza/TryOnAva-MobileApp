import React from 'react';
import {
  Modal, View, Text, StyleSheet, TouchableOpacity, Image,
} from 'react-native';
import { colors, typography, spacing } from '../theme';

interface Props {
  visible: boolean;
  icon: any;
  title: string;
  confirmLabel: string;
  confirmDanger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  visible, icon, title, confirmLabel, confirmDanger = false, onConfirm, onCancel,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={[styles.iconWrap, confirmDanger && styles.iconWrapDanger]}>
            <Image source={icon} style={styles.icon} resizeMode="contain" />
          </View>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity
            style={[styles.btn, confirmDanger ? styles.btnDanger : styles.btnPrimary]}
            onPress={onConfirm}
            activeOpacity={0.8}>
            <Text style={styles.btnText}>{confirmLabel}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnCancel}
            onPress={onCancel}
            activeOpacity={0.8}>
            <Text style={styles.btnCancelText}>No, Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  card: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.stroke,
  },
  iconWrap: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: `${colors.primary}22`,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  iconWrapDanger: { backgroundColor: `${colors.error}22` },
  icon: { width: 36, height: 36 },
  title: {
    ...typography.h2, color: colors.text, fontWeight: '700',
    textAlign: 'center', marginBottom: spacing.xl,
  },
  btn: {
    width: '100%', height: 52, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  btnPrimary: { backgroundColor: colors.primary },
  btnDanger: { backgroundColor: colors.error },
  btnText: { ...typography.p1, color: colors.background, fontWeight: '700' },
  btnCancel: {
    width: '100%', height: 52, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.cardSecondary,
    borderWidth: 1, borderColor: colors.stroke,
  },
  btnCancelText: { ...typography.p1, color: colors.text, fontWeight: '600' },
});
