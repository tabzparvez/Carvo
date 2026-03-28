import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { colors } from '../../styles/theme';

const offered = ['Engine', 'Electrical', 'AC', 'Oil change', 'Tyre', 'Towing'];

export default function MechanicSignupScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mechanic / Workshop Registration</Text>
      <TextInput placeholder="Workshop Name" style={styles.input} />
      <TextInput placeholder="Owner Name" style={styles.input} />
      <TextInput placeholder="Phone Number" style={styles.input} keyboardType="phone-pad" />
      <TextInput placeholder="CNIC" style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Map Pin + Address" style={styles.input} />
      <TextInput placeholder="Supported Car Brands" style={styles.input} />
      <TextInput placeholder="Availability (timings / 24-7)" style={styles.input} />
      <TextInput placeholder="Pricing in PKR (₨)" style={styles.input} />

      <Text style={styles.label}>Services Offered</Text>
      <View style={styles.wrap}>
        {offered.map((s) => (
          <Pressable key={s} style={styles.chip}><Text style={styles.chipText}>{s}</Text></Pressable>
        ))}
      </View>

      <PrimaryButton label="Submit (Demo)" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: colors.background },
  title: { fontSize: 22, fontWeight: '800', color: colors.text, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: colors.border, backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 10, marginBottom: 8 },
  label: { marginTop: 4, marginBottom: 6, fontWeight: '700', color: colors.text },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  chip: { borderWidth: 1, borderColor: colors.border, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6, backgroundColor: '#fff' },
  chipText: { color: colors.subtext, fontWeight: '600', fontSize: 12 }
});
