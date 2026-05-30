import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';

interface Props {
  onBack: () => void;
}

export default function TermsScreen({ onBack }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.section}>Acceptance of Terms</Text>
        <Text style={styles.body}>
          By downloading or using TryOnAva, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the application.
        </Text>

        <Text style={styles.section}>Use of the Application</Text>
        <Text style={styles.bullet}>• You must be at least 13 years old to use TryOnAva</Text>
        <Text style={styles.bullet}>• You are responsible for maintaining the security of your account</Text>
        <Text style={styles.bullet}>• You agree not to misuse the platform or attempt unauthorized access</Text>
        <Text style={styles.bullet}>• You will not use the app for any unlawful purpose</Text>

        <Text style={styles.section}>Intellectual Property</Text>
        <Text style={styles.body}>
          All content, features, and functionality within TryOnAva — including designs, logos, and software — are owned by TryOnAva and protected by applicable intellectual property laws.
        </Text>

        <Text style={styles.section}>Virtual Try-On</Text>
        <Text style={styles.body}>
          The virtual try-on feature uses avatar technology to simulate clothing on a digital representation of you. Results are for visualization purposes only and may differ from actual product fit.
        </Text>

        <Text style={styles.section}>Account Termination</Text>
        <Text style={styles.body}>
          We reserve the right to suspend or terminate your account if you violate these terms. You may also delete your account at any time from the Profile settings.
        </Text>

        <Text style={styles.section}>Limitation of Liability</Text>
        <Text style={styles.body}>
          TryOnAva is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the application.
        </Text>

        <Text style={styles.section}>Changes to Terms</Text>
        <Text style={styles.body}>
          We may update these Terms from time to time. Continued use of the app after changes constitutes your acceptance of the new terms.
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
