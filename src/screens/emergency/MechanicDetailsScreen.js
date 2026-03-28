import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { colors } from '../../styles/theme';

export default function MechanicDetailsScreen({ route, navigation }) {
  const { mechanic } = route.params;
  const [rating, setRating] = useState(5);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>{mechanic.name}</Text>
        <Text style={styles.meta}>Rating: {mechanic.rating} ⭐</Text>
        <Text style={styles.meta}>Estimated arrival: {mechanic.eta}</Text>
        <Text style={styles.meta}>Distance: {mechanic.distance}</Text>
        <Text style={styles.meta}>Specialization: {mechanic.specialization.join(', ')}</Text>
        <Text style={styles.meta}>Estimated cost range: {mechanic.costRange}</Text>
        <Text style={styles.meta}>Supports: {mechanic.supportedBrands.join(', ')}</Text>

        <Text style={styles.rateTitle}>Your expected service rating</Text>
        <View style={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Pressable key={star} onPress={() => setRating(star)}>
              <Text style={[styles.star, star <= rating && styles.activeStar]}>★</Text>
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.callBtn} onPress={() => Alert.alert('Calling mechanic...', 'This is a demo action.') }>
          <Text style={styles.callText}>Call Mechanic</Text>
        </Pressable>

        <PrimaryButton
          label="Book Mechanic"
          onPress={() => navigation.navigate('Tracking', { mechanic })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16
  },
  card: {
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12
  },
  meta: {
    color: colors.subtext,
    marginBottom: 6
  },
  rateTitle: {
    marginTop: 18,
    marginBottom: 8,
    color: colors.text,
    fontWeight: '700'
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16
  },
  star: {
    fontSize: 26,
    color: '#D0D5DD'
  },
  activeStar: {
    color: '#FDB022'
  },
  callBtn: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 10
  },
  callText: {
    color: colors.primary,
    fontWeight: '700'
  }
});
