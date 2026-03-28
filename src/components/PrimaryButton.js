import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../styles/theme';

export default function PrimaryButton({ label, onPress, disabled = false, accessibilityLabel }) {
  return (
    <Pressable
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || label}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    minHeight: 48,
    justifyContent: 'center'
  },
  disabled: {
    opacity: 0.5
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700'
  }
});
