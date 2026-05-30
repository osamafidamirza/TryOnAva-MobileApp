import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  SafeAreaView, ScrollView, ActivityIndicator, Alert, Image,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import { colors, typography, spacing } from '../../theme';
import { RootState } from '../../store';
import { updateUser } from '../../store/authSlice';
import { userApi } from '../../api/user';

interface Props {
  onBack: () => void;
}

export default function EditProfileScreen({ onBack }: Props) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [age, setAge] = useState(user?.age?.toString() ?? '');
  const [gender, setGender] = useState(user?.gender ?? '');
  const [avatar, setAvatar] = useState<string | undefined>(user?.avatar);
  const [saving, setSaving] = useState(false);

  const handlePickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5,
      presentationStyle: 'pageSheet',
    });
    const asset = result.assets?.[0];
    if (!asset?.uri) return;

    try {
      const resized = await ImageResizer.createResizedImage(asset.uri, 200, 200, 'JPEG', 50);
      const base64 = await fetch(resized.uri)
        .then(r => r.blob())
        .then(blob => new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }));
      setAvatar(base64);
    } catch {
      Alert.alert('Error', 'Could not process image.');
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Name is required.');
      return;
    }
    setSaving(true);
    try {
      const payload: any = { name: name.trim(), email: email.trim() };
      if (age) payload.age = parseInt(age, 10);
      if (gender) payload.gender = gender;
      if (avatar) payload.avatar = avatar;

      const res = await userApi.updateMe(payload);
      dispatch(updateUser(res.data));
      await AsyncStorage.setItem('user', JSON.stringify(res.data));
      onBack();
    } catch (err: any) {
      Alert.alert('Error', err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const avatarSource = avatar ? { uri: avatar } : null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={styles.backBtn} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarCircle}>
            {avatarSource
              ? <Image source={avatarSource} style={styles.avatarImage} />
              : <Text style={styles.avatarInitial}>
                  {name.charAt(0).toUpperCase() || '?'}
                </Text>
            }
          </View>
          <TouchableOpacity style={styles.cameraBtn} onPress={handlePickImage}>
            <Text style={styles.cameraIcon}>📷</Text>
          </TouchableOpacity>
        </View>

        {/* Fields */}
        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor={colors.subtext}
            />
            <Text style={styles.editIcon}>✎</Text>
          </View>

          <Text style={styles.label}>Email</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="your@email.com"
              placeholderTextColor={colors.subtext}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={styles.editIcon}>✎</Text>
          </View>

          <Text style={styles.label}>Age</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              placeholder="Your age"
              placeholderTextColor={colors.subtext}
              keyboardType="numeric"
            />
            <Text style={styles.editIcon}>✎</Text>
          </View>

          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderRow}>
            {(['male', 'female'] as const).map(g => (
              <TouchableOpacity
                key={g}
                style={[styles.genderBtn, gender === g && styles.genderBtnActive]}
                onPress={() => setGender(g)}
                activeOpacity={0.7}>
                <Text style={[styles.genderText, gender === g && styles.genderTextActive]}>
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.saveBtn, saving && styles.saveBtnDisabled]}
          onPress={handleSave}
          disabled={saving}
          activeOpacity={0.8}>
          {saving
            ? <ActivityIndicator color={colors.background} />
            : <Text style={styles.saveBtnText}>Update</Text>
          }
        </TouchableOpacity>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
      </KeyboardAvoidingView>
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
  scroll: { paddingHorizontal: spacing.lg, paddingTop: spacing.xl },
  avatarSection: { alignItems: 'center', marginBottom: spacing.xl },
  avatarCircle: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: colors.cardSecondary,
    borderWidth: 2, borderColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: { width: 100, height: 100, borderRadius: 50 },
  avatarInitial: { fontSize: 40, fontWeight: '700', color: colors.primary },
  cameraBtn: {
    position: 'absolute', bottom: 0, right: '32%',
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  cameraIcon: { fontSize: 14 },
  form: { gap: spacing.xs },
  label: { ...typography.p2, color: colors.subtext, marginTop: spacing.md },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.cardSecondary, borderRadius: 12, height: 52,
    paddingHorizontal: spacing.md, borderWidth: 1, borderColor: colors.stroke,
  },
  input: { flex: 1, color: colors.text, ...typography.p1 },
  editIcon: { fontSize: 16, color: colors.subtext },
  genderRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xs },
  genderBtn: {
    flex: 1, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.cardSecondary, borderWidth: 1, borderColor: colors.stroke,
  },
  genderBtnActive: { borderColor: colors.primary, backgroundColor: `${colors.primary}15` },
  genderText: { ...typography.p1, color: colors.subtext, fontWeight: '600' },
  genderTextActive: { color: colors.primary },
  saveBtn: {
    backgroundColor: colors.primary, height: 52, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', marginTop: spacing.xl,
  },
  saveBtnDisabled: { opacity: 0.6 },
  saveBtnText: { ...typography.p1, color: colors.background, fontWeight: '700' },
});
