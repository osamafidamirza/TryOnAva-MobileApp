import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
  Dimensions, ActivityIndicator, Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors, typography, spacing } from '../../theme';
import { RootState } from '../../store';
import { setStyle } from '../../store/onboardingSlice';
import { updateUser } from '../../store/authSlice';
import { userApi } from '../../api/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const STYLES = [
  { id: 'street', label: 'Street Style' },
  { id: 'sports', label: 'Sports Style' },
  { id: 'casual', label: 'Casual Style' },
  { id: 'formal', label: 'Formal Style' },
];

interface Props {
  onBack: () => void;
}

export default function EditStyleScreen({ onBack }: Props) {
  const dispatch = useDispatch();
  const currentStyle = useSelector((state: RootState) => state.onboarding.style);
  const [selected, setSelected] = useState<string>(currentStyle ?? 'street');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await userApi.updateMe({ style: selected as any });
      dispatch(setStyle(selected));
      dispatch(updateUser(res.data));
      await AsyncStorage.setItem('user', JSON.stringify(res.data));
      onBack();
    } catch {
      Alert.alert('Error', 'Failed to save style. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Style</Text>
        <View style={styles.backBtn} />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Edit Your Style</Text>
        <Text style={styles.subtitle}>Select the style you like to personalize your experience</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>What's your style preference?</Text>
          {STYLES.map(style => {
            const isSelected = selected === style.id;
            return (
              <TouchableOpacity
                key={style.id}
                style={[styles.option, isSelected && styles.optionSelected]}
                onPress={() => setSelected(style.id)}
                activeOpacity={0.7}>
                <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                  {style.label}
                </Text>
                <View style={[styles.radio, isSelected && styles.radioSelected]}>
                  {isSelected && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={[styles.saveBtn, saving && styles.saveBtnDisabled]}
          onPress={handleSave}
          disabled={saving}
          activeOpacity={0.8}>
          {saving
            ? <ActivityIndicator color={colors.background} />
            : <Text style={styles.saveBtnText}>Save</Text>
          }
        </TouchableOpacity>
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
  container: { flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.xl, alignItems: 'center' },
  title: { ...typography.h1, color: colors.text, fontWeight: '700', textAlign: 'center', marginBottom: spacing.xs },
  subtitle: { ...typography.p2, color: colors.subtext, textAlign: 'center', marginBottom: spacing.xl },
  card: {
    width: '100%', backgroundColor: colors.card,
    borderRadius: 16, padding: spacing.lg,
    borderWidth: 1, borderColor: colors.stroke,
    gap: spacing.sm,
  },
  cardTitle: { ...typography.p1, color: colors.text, fontWeight: '600', marginBottom: spacing.sm },
  option: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: colors.cardSecondary, borderRadius: 10,
    paddingHorizontal: spacing.md, paddingVertical: spacing.md,
    borderWidth: 1, borderColor: colors.stroke,
  },
  optionSelected: { borderColor: colors.primary },
  optionLabel: { ...typography.p1, color: colors.subtext },
  optionLabelSelected: { color: colors.text, fontWeight: '600' },
  radio: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 2, borderColor: colors.subtext,
    alignItems: 'center', justifyContent: 'center',
  },
  radioSelected: { borderColor: colors.primary },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary },
  saveBtn: {
    width: width - spacing.lg * 2, height: 52, borderRadius: 12,
    backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center',
    position: 'absolute', bottom: spacing.xl,
  },
  saveBtnDisabled: { opacity: 0.6 },
  saveBtnText: { ...typography.p1, color: colors.background, fontWeight: '700' },
});
