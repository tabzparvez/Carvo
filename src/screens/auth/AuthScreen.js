import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { colors } from '../../styles/theme';

export default function AuthScreen({ onAuthSuccess }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.hero}>
        <Text style={styles.brand}>AutoRescue</Text>
        <Text style={styles.tagline}>Roadside assistance in minutes.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>{isLoginMode ? 'Welcome back' : 'Create account'}</Text>
        {!isLoginMode ? (
          <TextInput placeholder="Full Name" style={styles.input} value={name} onChangeText={setName} />
        ) : null}
        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput placeholder="Password" style={styles.input} secureTextEntry />
        <PrimaryButton label={isLoginMode ? 'Login' : 'Sign Up'} onPress={onAuthSuccess} />

        <Pressable style={styles.switch} onPress={() => setIsLoginMode((prev) => !prev)}>
          <Text style={styles.switchText}>
            {isLoginMode ? 'No account? Sign up' : 'Already have an account? Login'}
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: 'center'
  },
  hero: {
    marginBottom: 28
  },
  brand: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.text
  },
  tagline: {
    marginTop: 8,
    color: colors.subtext,
    fontSize: 15
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 18
  },
  heading: {
    fontWeight: '700',
    fontSize: 22,
    color: colors.text,
    marginBottom: 14
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 10,
    fontSize: 15
  },
  switch: {
    marginTop: 14,
    alignItems: 'center'
  },
  switchText: {
    color: colors.primary,
    fontWeight: '600'
  }
});
