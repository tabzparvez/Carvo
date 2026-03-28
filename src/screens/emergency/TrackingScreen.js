import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import { trackingUpdates } from '../../data/mockData';
import { colors } from '../../styles/theme';

export default function TrackingScreen({ route, navigation }) {
  const { mechanic } = route.params;
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= trackingUpdates.length - 1) return;
    const timer = setTimeout(() => setStep((prev) => prev + 1), 1400);
    return () => clearTimeout(timer);
  }, [step]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tracking {mechanic.name}</Text>
      <View style={styles.mapMock}>
        <Text style={styles.mapLabel}>Mock Map View</Text>
        <Text style={styles.mapSub}>Mechanic is navigating to your location</Text>
      </View>

      {trackingUpdates.map((item, index) => (
        <Text key={item} style={[styles.update, index <= step && styles.updateActive]}>
          {index <= step ? '●' : '○'} {item}
        </Text>
      ))}

      <View style={styles.cta}>
        <PrimaryButton
          label="Confirm Booking"
          onPress={() =>
            navigation.navigate('Success', {
              title: 'Mechanic Booked!',
              message: `${mechanic.name} is on the way to your location.`
            })
          }
        />
      </View>
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
    color: colors.text,
    fontWeight: '800',
    fontSize: 21,
    marginBottom: 12
  },
  mapMock: {
    height: 180,
    backgroundColor: '#DDE8FF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18
  },
  mapLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary
  },
  mapSub: {
    color: '#355A99',
    marginTop: 6
  },
  update: {
    color: colors.subtext,
    marginBottom: 10,
    fontSize: 15
  },
  updateActive: {
    color: colors.text,
    fontWeight: '600'
  },
  cta: {
    marginTop: 'auto'
  }
});
