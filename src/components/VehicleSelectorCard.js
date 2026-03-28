import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { cars } from '../data/mockData';
import { colors } from '../styles/theme';

export default function VehicleSelectorCard({ vehicle, setVehicle }) {
  const makes = useMemo(() => [...new Set(cars.map((car) => car.make))], []);
  const models = useMemo(
    () => [...new Set(cars.filter((car) => car.make === vehicle.make).map((car) => car.model))],
    [vehicle.make]
  );
  const years = useMemo(
    () => [...new Set(cars.filter((car) => car.make === vehicle.make && car.model === vehicle.model).map((car) => car.year))],
    [vehicle.make, vehicle.model]
  );

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Select Vehicle (Make / Model / Year)</Text>

      <Text style={styles.label}>Make</Text>
      <View style={styles.rowWrap}>
        {makes.map((make) => (
          <Pressable
            key={make}
            style={[styles.chip, vehicle.make === make && styles.chipActive]}
            onPress={() => {
              const firstModel = [...new Set(cars.filter((car) => car.make === make).map((car) => car.model))][0];
              const firstYear = cars.find((car) => car.make === make && car.model === firstModel)?.year;
              setVehicle({ make, model: firstModel, year: firstYear });
            }}
          >
            <Text style={[styles.chipText, vehicle.make === make && styles.chipTextActive]}>{make}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Model</Text>
      <View style={styles.rowWrap}>
        {models.map((model) => (
          <Pressable
            key={model}
            style={[styles.chip, vehicle.model === model && styles.chipActive]}
            onPress={() => {
              const firstYear = cars.find((car) => car.make === vehicle.make && car.model === model)?.year;
              setVehicle((prev) => ({ ...prev, model, year: firstYear }));
            }}
          >
            <Text style={[styles.chipText, vehicle.model === model && styles.chipTextActive]}>{model}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Year</Text>
      <View style={styles.rowWrap}>
        {years.map((year) => (
          <Pressable
            key={year}
            style={[styles.chip, vehicle.year === year && styles.chipActive]}
            onPress={() => setVehicle((prev) => ({ ...prev, year }))}
          >
            <Text style={[styles.chipText, vehicle.year === year && styles.chipTextActive]}>{year}</Text>
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
