import React, { useMemo, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PrimaryButton from '../../components/PrimaryButton';
import { nearbyMechanics } from '../../data/mockData';
import { colors } from '../../styles/theme';

export default function MaintenanceBookingScreen({ route, navigation, appContext }) {
  const { service } = route.params;
  const [date, setDate] = useState(new Date());

  const compatibleMechanics = useMemo(
    () =>
      nearbyMechanics.filter((m) =>
        m.supportedVehicles.some(
          (v) => v.make === appContext.vehicle.make && v.model === appContext.vehicle.model
        )
      ),
    [appContext.vehicle.make, appContext.vehicle.model]
  );

  const [preferredMechanic, setPreferredMechanic] = useState(compatibleMechanics[0]?.name || 'Any Available');

  const bookService = () => {
    appContext.addHistoryItem({
      title: service.title,
      subtitle: `${appContext.vehicle.make} ${appContext.vehicle.model} ${appContext.vehicle.year} • ${date.toLocaleString()}`,
      amount: `$${service.basePrice}`
    });

    navigation.navigate('Success', {
      title: 'Service Booked',
      message: `${service.title} for ${appContext.vehicle.make} ${appContext.vehicle.model} (${appContext.vehicle.year}) is scheduled for ${date.toLocaleString()}.`
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{service.title}</Text>
      <Text style={styles.price}>Starting from: ${service.basePrice}</Text>
      <Text style={styles.range}>Estimated range: {service.priceRange}</Text>
      <Text style={styles.vehicle}>
        Vehicle: {appContext.vehicle.make} {appContext.vehicle.model} ({appContext.vehicle.year})
      </Text>

      <Text style={styles.label}>Recommended parts</Text>
      <Text style={styles.partsText}>{service.recommendedParts.join(' • ')}</Text>

      <Text style={styles.label}>Preferred mechanic (optional)</Text>
      <View style={styles.chipsWrap}>
        <Pressable
          style={[styles.chip, preferredMechanic === 'Any Available' && styles.chipActive]}
          onPress={() => setPreferredMechanic('Any Available')}
        >
          <Text style={[styles.chipText, preferredMechanic === 'Any Available' && styles.chipTextActive]}>Any Available</Text>
        </Pressable>
        {compatibleMechanics.map((m) => (
          <Pressable
            key={m.id}
            style={[styles.chip, preferredMechanic === m.name && styles.chipActive]}
            onPress={() => setPreferredMechanic(m.name)}
          >
            <Text style={[styles.chipText, preferredMechanic === m.name && styles.chipTextActive]}>{m.name}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Choose Date & Time</Text>
      <View style={styles.pickerCard}>
        <DateTimePicker
          value={date}
          mode="datetime"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(_, selectedDate) => selectedDate && setDate(selectedDate)}
        />
      </View>

      <PrimaryButton label="Confirm Booking" onPress={bookService} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text
  },
  price: {
    marginTop: 6,
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700'
  },
  range: {
    marginTop: 4,
    color: colors.subtext,
    fontWeight: '600'
  },
  vehicle: {
    marginTop: 6,
    color: colors.subtext,
    fontWeight: '600'
  },
  label: {
    marginTop: 14,
    marginBottom: 8,
    fontWeight: '700',
    color: colors.text
  },
  partsText: {
    color: colors.subtext,
    lineHeight: 20
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
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
  },
  pickerCard: {
    padding: 8,
    borderRadius: 14,
    backgroundColor: '#fff',
    borderColor: colors.border,
    borderWidth: 1,
    marginTop: 8,
    marginBottom: 16
  }
});
