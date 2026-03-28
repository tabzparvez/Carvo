import React, { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import InfoCard from '../../components/InfoCard';
import { nearbyMechanics, problemOptions, serviceCategories } from '../../data/mockData';
import { colors } from '../../styles/theme';

export default function EmergencyHomeScreen({ navigation, appContext }) {
  const [location, setLocation] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);

  const detectLocation = () => {
    setIsDetecting(true);
    setTimeout(() => {
      setLocation({
        address: 'Shahrah-e-Faisal, Karachi',
        source: 'mock_gps',
        coordinates: { lat: 24.8607, lng: 67.0011 }
      });
      setIsDetecting(false);
    }, 800);
  };

  const selectedVehicle = appContext.selectedVehicle;

  const filteredMechanics = useMemo(() => {
    if (!selectedVehicle) return nearbyMechanics;
    return nearbyMechanics.filter((m) => m.supportedBrands.includes(selectedVehicle.make));
  }, [selectedVehicle]);

  return (
    <View style={styles.container}>
      <Pressable style={styles.emergencyBtn} onPress={detectLocation}>
        {isDetecting ? <ActivityIndicator color="#fff" /> : <Text style={styles.emergencyText}>🚨 Emergency</Text>}
      </Pressable>

      <InfoCard
        title="Active Vehicle"
        subtitle={selectedVehicle ? `${selectedVehicle.make} ${selectedVehicle.model} (${selectedVehicle.year})` : 'No default vehicle selected'}
      />

      <Text style={styles.sectionTitle}>Service Categories</Text>
      <View style={styles.wrap}>
        {serviceCategories.map((item) => (
          <Pressable key={item.id} style={[styles.chip, selectedService === item.title && styles.chipActive]} onPress={() => setSelectedService(item.title)}>
            <Ionicons name={item.icon} size={14} color={selectedService === item.title ? colors.primary : colors.subtext} />
            <Text style={[styles.chipText, selectedService === item.title && styles.chipTextActive]}>{item.title}</Text>
          </Pressable>
        ))}
      </View>

      {selectedService ? (
        <>
          <Text style={styles.sectionTitle}>Problem</Text>
          <View style={styles.wrap}>
            {problemOptions.map((problem) => (
              <Pressable key={problem} style={[styles.chip, selectedProblem === problem && styles.chipActive]} onPress={() => setSelectedProblem(problem)}>
                <Text style={[styles.chipText, selectedProblem === problem && styles.chipTextActive]}>{problem}</Text>
              </Pressable>
            ))}
          </View>
        </>
      ) : null}

      {location ? (
        <View style={styles.mapCard}>
          <Text style={styles.mapTitle}>Map (Demo) • {location.address}</Text>
          <View style={styles.mapArea}>
            <View style={[styles.userDot, { left: '48%', top: '52%' }]} />
            {filteredMechanics.map((m) => (
              <Pressable
                key={m.id}
                style={[styles.marker, { left: `${m.location.x}%`, top: `${m.location.y}%` }]}
                onPress={() => setActiveMarker(m)}
              >
                <Text style={{ color: '#fff', fontWeight: '700' }}>M</Text>
              </Pressable>
            ))}
          </View>
          {activeMarker ? (
            <Text style={styles.mapMeta}>{activeMarker.name} • {activeMarker.eta} • {activeMarker.distance}</Text>
          ) : null}
        </View>
      ) : null}

      <Text style={styles.sectionTitle}>Nearby Mechanics</Text>
      <FlatList
        data={filteredMechanics}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <InfoCard title={item.name} subtitle={`${item.distance} • ${item.eta}`}>
            <Text style={styles.meta}>⭐ {item.rating} • {item.availability}</Text>
            <Text style={styles.meta}>Specialization: {item.specialization.join(', ')}</Text>
            <Text style={styles.meta}>Supported Brands: {item.supportedBrands.join(', ')}</Text>
            <Text style={styles.meta}>Price Estimate: {item.priceEstimatePkr}</Text>

            <Pressable
              style={styles.requestBtn}
              onPress={() => navigation.navigate('Tracking', { mechanic: item, service: selectedService, problem: selectedProblem })}
            >
              <Text style={styles.requestText}>Request Service</Text>
            </Pressable>
          </InfoCard>
        )}
      />

      <Pressable onPress={() => navigation.navigate('MechanicSignup')}>
        <Text style={styles.joinLink}>Mechanic/Workshop? Register Here</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  emergencyBtn: { backgroundColor: '#E5484D', minHeight: 56, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  emergencyText: { color: '#fff', fontWeight: '800', fontSize: 18 },
  sectionTitle: { marginTop: 8, marginBottom: 6, fontWeight: '800', color: colors.text, fontSize: 16 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  chip: { borderWidth: 1, borderColor: colors.border, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 7, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', gap: 6 },
  chipActive: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  chipText: { color: colors.subtext, fontWeight: '600', fontSize: 12 },
  chipTextActive: { color: colors.primary, fontWeight: '700' },
  mapCard: { borderWidth: 1, borderColor: colors.border, borderRadius: 12, backgroundColor: '#fff', padding: 10, marginBottom: 8 },
  mapTitle: { color: colors.text, fontWeight: '700', marginBottom: 8 },
  mapArea: { height: 130, borderRadius: 10, backgroundColor: '#DDE8FF', position: 'relative' },
  marker: { width: 22, height: 22, borderRadius: 11, backgroundColor: colors.primary, position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  userDot: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#E5484D', position: 'absolute' },
  mapMeta: { marginTop: 6, color: colors.subtext, fontWeight: '600' },
  meta: { color: colors.subtext, marginBottom: 4, fontSize: 12 },
  requestBtn: { marginTop: 8, backgroundColor: colors.primarySoft, borderRadius: 10, paddingVertical: 10, alignItems: 'center' },
  requestText: { color: colors.primary, fontWeight: '800' },
  joinLink: { textAlign: 'center', color: colors.primary, fontWeight: '700', marginTop: 8 }
});
