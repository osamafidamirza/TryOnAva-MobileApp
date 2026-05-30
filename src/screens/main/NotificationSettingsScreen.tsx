import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Switch, SafeAreaView,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface Props {
  onBack: () => void;
}

export default function NotificationSettingsScreen({ onBack }: Props) {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification Settings</Text>
        <View style={styles.backBtn} />
      </View>

      <View style={styles.container}>
        <Text style={styles.subtitle}>Stay Updated about your orders</Text>

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowTitle}>Push Notifications</Text>
            <Text style={styles.rowDesc}>Receive alerts on your device</Text>
          </View>
          <Switch
            value={pushEnabled}
            onValueChange={setPushEnabled}
            trackColor={{ false: colors.stroke, true: `${colors.primary}55` }}
            thumbColor={pushEnabled ? colors.primary : colors.subtext}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Text style={styles.rowTitle}>Email Notifications</Text>
            <Text style={styles.rowDesc}>Receive updates via email</Text>
          </View>
          <Switch
            value={emailEnabled}
            onValueChange={setEmailEnabled}
            trackColor={{ false: colors.stroke, true: `${colors.primary}55` }}
            thumbColor={emailEnabled ? colors.primary : colors.subtext}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
    borderBottomWidth: 1, borderBottomColor: colors.stroke,
  },
  backBtn: { width: 40, alignItems: 'flex-start' },
  backText: { fontSize: 22, color: colors.text },
  headerTitle: { ...typography.h2, color: colors.text, fontWeight: '700' },
  container: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.xl },
  subtitle: { ...typography.p2, color: colors.subtext, marginBottom: spacing.xl },
  row: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: colors.card, borderRadius: 14, padding: spacing.md,
    borderWidth: 1, borderColor: colors.stroke,
  },
  rowLeft: { flex: 1, marginRight: spacing.md },
  rowTitle: { ...typography.p1, color: colors.text, fontWeight: '600' },
  rowDesc: { ...typography.p2, color: colors.subtext, marginTop: 2 },
  divider: { height: spacing.sm },
});
