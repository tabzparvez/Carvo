import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../styles/theme';

export default function SuccessScreen({ navigation, route }) {
  const title = route.params?.title || 'Success';
  const message = route.params?.message || 'Your request has been submitted.';

  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>✓</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <PrimaryButton label="Back to Home" onPress={() => navigation.popToTop()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 22,
    backgroundColor: colors.background
  },
  badge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#DFF5E8',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 16
  },
  badgeText: {
    color: colors.success,
    fontSize: 34,
    fontWeight: '700'
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '800',
    color: colors.text
  },
  message: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    color: colors.subtext,
    fontSize: 15
  }
});
