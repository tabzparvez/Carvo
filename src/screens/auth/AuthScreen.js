import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { colors } from '../../styles/theme';

export default function AuthScreen({ onAuthSuccess }) {
  const [otpSent, setOtpSent] = useState(false);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.hero}>
        <Text style={styles.brand}>AutoRescue Pakistan</Text>
        <Text style={styles.tagline}>Uber-style roadside assistance for Karachi.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Create Account</Text>
        <TextInput placeholder="Full Name" style={styles.input} />
        <TextInput placeholder="Mobile Number" style={styles.input} keyboardType="phone-pad" />

        <Pressable onPress={() => setOtpSent(true)} style={styles.otpBtn}>
          <Text style={styles.otpText}>{otpSent ? 'OTP Sent ✅' : 'Send OTP'}</Text>
        </Pressable>

        <TextInput placeholder="OTP Code" style={styles.input} keyboardType="numeric" />
        <TextInput placeholder="Password" style={styles.input} secureTextEntry />

        <PrimaryButton label="Sign Up" onPress={onAuthSuccess} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20, justifyContent: 'center' },
  hero: { marginBottom: 28 },
  brand: { fontSize: 30, fontWeight: '800', color: colors.text },
  tagline: { marginTop: 8, color: colors.subtext, fontSize: 15 },
  card: { backgroundColor: '#fff', borderRadius: 16, borderColor: colors.border, borderWidth: 1, padding: 18 },
  heading: { fontWeight: '700', fontSize: 22, color: colors.text, marginBottom: 14 },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 12, marginBottom: 10, fontSize: 15 },
  otpBtn: { marginBottom: 10, alignSelf: 'flex-start', backgroundColor: colors.primarySoft, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  otpText: { color: colors.primary, fontWeight: '700' }
});
