import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { vehicleCatalog } from '../data/mockData';
import { colors } from '../styles/theme';

export default function VehicleSelectorCard({ vehicle, setVehicle }) {
  const makes = Object.keys(vehicleCatalog);
  const availableModels = vehicleCatalog[vehicle.make] || [];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Select Vehicle (Make / Model)</Text>

      <Text style={styles.label}>Make</Text>
      <View style={styles.rowWrap}>
        {makes.map((make) => (
          <Pressable
            key={make}
            style={[styles.chip, vehicle.make === make && styles.chipActive]}
            onPress={() => setVehicle({ make, model: vehicleCatalog[make][0] })}
            accessibilityRole="button"
            accessibilityLabel={`Select make ${make}`}
          >
            <Text style={[styles.chipText, vehicle.make === make && styles.chipTextActive]}>{make}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Model</Text>
      <View style={styles.rowWrap}>
        {availableModels.map((model) => (
          <Pressable
            key={model}
            style={[styles.chip, vehicle.model === model && styles.chipActive]}
            onPress={() => setVehicle((prev) => ({ ...prev, model }))}
            accessibilityRole="button"
            accessibilityLabel={`Select model ${model}`}
          >
            <Text style={[styles.chipText, vehicle.model === model && styles.chipTextActive]}>{model}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12
  },
  title: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 10
  },
  label: {
    color: colors.subtext,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: '#F8FAFC'
  },
  chipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft
  },
  chipText: {
    color: colors.subtext,
    fontWeight: '600',
    fontSize: 12
  },
  chipTextActive: {
    color: colors.primary,
    fontWeight: '700'
  }
});
