import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface Props {
  onBack: () => void;
}

export default function PrivacyPolicyScreen({ onBack }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy & Policy</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.section}>Introduction</Text>
        <Text style={styles.body}>
          Welcome to TryOnAva. We are committed to protecting your personal information and your right to privacy. This policy explains how we collect, use, and safeguard your data when you use our application.
        </Text>

        <Text style={styles.section}>Information We Collect</Text>
        <Text style={styles.bullet}>• Name and email address provided during registration</Text>
        <Text style={styles.bullet}>• Age and gender for personalized style recommendations</Text>
        <Text style={styles.bullet}>• Style preferences selected during onboarding</Text>
        <Text style={styles.bullet}>• Profile photo (stored securely, never shared)</Text>
        <Text style={styles.bullet}>• Order history and closet items</Text>

        <Text style={styles.section}>How We Use Your Data</Text>
        <Text style={styles.body}>
          Your data is used solely to provide and improve the TryOnAva experience — personalizing your avatar, recommending styles, and managing your orders. We do not sell your data to third parties.
        </Text>

        <Text style={styles.section}>Body Measurements</Text>
        <Text style={styles.body}>
          Any body measurements you provide are stored on your device only and are never transmitted to our servers. This ensures your biometric data remains fully private.
        </Text>

        <Text style={styles.section}>Your Rights</Text>
        <Text style={styles.bullet}>• Access the data we hold about you</Text>
        <Text style={styles.bullet}>• Request correction of inaccurate data</Text>
        <Text style={styles.bullet}>• Request deletion of your account and data</Text>
        <Text style={styles.bullet}>• Withdraw consent at any time</Text>

        <Text style={styles.section}>Contact Us</Text>
        <Text style={styles.body}>
          If you have any questions about this Privacy Policy, please contact us through the app's support section.
        </Text>

        <View style={{ height: spacing.xl * 2 }} />
      </ScrollView>
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
  scroll: { flex: 1, paddingHorizontal: spacing.lg },
  section: {
    ...typography.p1, color: colors.primary, fontWeight: '700',
    marginTop: spacing.xl, marginBottom: spacing.sm,
  },
  body: { ...typography.p2, color: colors.subtext, lineHeight: 22 },
  bullet: { ...typography.p2, color: colors.subtext, lineHeight: 26, marginLeft: spacing.sm },
});
