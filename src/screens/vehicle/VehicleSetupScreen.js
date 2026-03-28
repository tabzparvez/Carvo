import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { fuelTypes, vehicleMaster, yearOptions } from '../../data/mockData';
import { colors } from '../../styles/theme';

export default function VehicleSetupScreen({ appContext, onContinue, onSkip }) {
  const [make, setMake] = useState('Toyota');
  const [model, setModel] = useState(vehicleMaster.Toyota[0]);
  const [year, setYear] = useState(2021);
  const [fuelType, setFuelType] = useState('Petrol');
  const [mileage, setMileage] = useState('');

  const models = vehicleMaster[make] || [];

  const saveVehicle = () => {
    appContext.addVehicle({ make, model, year, fuelType, mileage: mileage ? Number(mileage) : null });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Your Vehicle</Text>
      <Text style={styles.subtitle}>You can skip for now and add later.</Text>

      <Text style={styles.label}>Make</Text>
      <View style={styles.wrap}>
        {Object.keys(vehicleMaster).map((item) => (
          <Pressable
            key={item}
            style={[styles.chip, make === item && styles.chipActive]}
            onPress={() => {
              setMake(item);
              setModel(vehicleMaster[item][0]);
            }}
          >
            <Text style={[styles.chipText, make === item && styles.chipTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Model</Text>
      <View style={styles.wrap}>
        {models.map((item) => (
          <Pressable key={item} style={[styles.chip, model === item && styles.chipActive]} onPress={() => setModel(item)}>
            <Text style={[styles.chipText, model === item && styles.chipTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Year (Required)</Text>
      <View style={styles.wrap}>
        {yearOptions.map((item) => (
          <Pressable key={item} style={[styles.chip, year === item && styles.chipActive]} onPress={() => setYear(item)}>
            <Text style={[styles.chipText, year === item && styles.chipTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Fuel Type</Text>
      <View style={styles.wrap}>
        {fuelTypes.map((item) => (
          <Pressable key={item} style={[styles.chip, fuelType === item && styles.chipActive]} onPress={() => setFuelType(item)}>
            <Text style={[styles.chipText, fuelType === item && styles.chipTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <TextInput
        value={mileage}
        onChangeText={setMileage}
        keyboardType="numeric"
        placeholder="Mileage (optional)"
        style={styles.input}
      />

      <PrimaryButton label="Save Vehicle" onPress={saveVehicle} />

      <FlatList
        style={{ marginTop: 12 }}
        data={appContext.vehicles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.vehicleCard}>
            <Pressable onPress={() => appContext.setDefaultVehicleId(item.id)}>
              <Text style={styles.vehicleText}>
                {item.make} {item.model} ({item.year}) {appContext.defaultVehicleId === item.id ? '• Default' : ''}
              </Text>
            </Pressable>
            <View style={styles.actions}>
              <Pressable onPress={() => appContext.updateVehicle(item.id, { mileage: (item.mileage || 0) + 1000 })}>
                <Text style={styles.actionText}>Edit</Text>
              </Pressable>
              <Pressable onPress={() => appContext.deleteVehicle(item.id)}>
                <Text style={[styles.actionText, { color: colors.danger }]}>Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      <View style={styles.bottomRow}>
        <Pressable onPress={onSkip}><Text style={styles.skip}>Skip</Text></Pressable>
        <PrimaryButton label="Continue" onPress={onContinue} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  title: { fontSize: 28, fontWeight: '800', color: colors.text },
  subtitle: { marginTop: 4, marginBottom: 10, color: colors.subtext },
  label: { marginTop: 8, marginBottom: 6, color: colors.text, fontWeight: '700' },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: colors.border, borderRadius: 999, backgroundColor: '#fff' },
  chipActive: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  chipText: { color: colors.subtext, fontSize: 12, fontWeight: '600' },
  chipTextActive: { color: colors.primary, fontWeight: '700' },
  input: { marginTop: 10, borderWidth: 1, borderColor: colors.border, backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 10 },
  vehicleCard: { marginTop: 8, backgroundColor: '#fff', borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 10 },
  vehicleText: { color: colors.text, fontWeight: '700' },
  actions: { flexDirection: 'row', gap: 12, marginTop: 4 },
  actionText: { color: colors.primary, fontWeight: '700' },
  bottomRow: { marginTop: 'auto', gap: 12 },
  skip: { textAlign: 'center', color: colors.subtext, fontWeight: '700' }
});
