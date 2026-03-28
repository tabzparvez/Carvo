import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import InfoCard from '../../components/InfoCard';
import VehicleSelectorCard from '../../components/VehicleSelectorCard';
import { nearbyMechanics } from '../../data/mockData';
import { colors } from '../../styles/theme';

const typeIcons = {
  car: 'car-sport',
  truck: 'bus',
  tow: 'trail-sign'
};

export default function EmergencyHomeScreen({ navigation, appContext }) {
  const [location, setLocation] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);

  const detectLocation = () => {
    setIsDetecting(true);

    setTimeout(() => {
      setLocation({
        address: 'Downtown Avenue, Sector 12',
        proximity: '1.8 km away'
      });
      setIsDetecting(false);
    }, 900);
  };

  return (
    <View style={styles.container}>
      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>Need urgent roadside help?</Text>
        <Text style={styles.heroSubtitle}>Tap emergency and instantly connect with nearby mechanics.</Text>

        <Pressable
          style={[styles.emergencyBtn, isDetecting && styles.emergencyBtnDisabled]}
          onPress={detectLocation}
          disabled={isDetecting}
          accessibilityRole="button"
          accessibilityLabel="Emergency roadside help"
        >
          {isDetecting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="warning" size={18} color="#fff" style={styles.emergencyIcon} />
              <Text style={styles.emergencyLabel}>Emergency</Text>
            </>
          )}
        </Pressable>

        {isDetecting ? <Text style={styles.detectingText}>Detecting your location…</Text> : null}
      </View>

      <VehicleSelectorCard vehicle={appContext.vehicle} setVehicle={appContext.setVehicle} />

      {location ? (
        <InfoCard
          title="Detected Location"
          subtitle={`${location.address} – ${location.proximity}`}
          rightNode={<Ionicons name="location" size={18} color={colors.primary} />}
        />
      ) : null}

      <Text style={styles.sectionTitle}>Nearby mechanics</Text>
      <FlatList
        data={nearbyMechanics}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('MechanicDetails', { mechanic: item })}
            accessibilityRole="button"
            accessibilityLabel={`Select ${item.name}`}
          >
            <InfoCard
              title={item.name}
              subtitle={item.proximityNote}
              rightNode={<Text style={styles.select}>Select</Text>}
            >
              <View style={styles.metaRow}>
                <View style={styles.metaPill}>
                  <Ionicons name={typeIcons[item.type] || 'construct'} size={14} color={colors.primary} />
                  <Text style={styles.metaText}>{item.type.toUpperCase()}</Text>
                </View>
                <View style={styles.metaPill}>
                  <Ionicons name="time-outline" size={14} color={colors.subtext} />
                  <Text style={styles.metaText}>{item.eta}</Text>
                </View>
                <View style={styles.metaPill}>
                  <Ionicons name="navigate-outline" size={14} color={colors.subtext} />
                  <Text style={styles.metaText}>{item.distance}</Text>
                </View>
                <View style={styles.metaPill}>
                  <Text style={styles.star}>★</Text>
                  <Text style={styles.metaText}>{item.rating}</Text>
                </View>
                <View style={styles.metaPill}>
                  <Ionicons name="car-outline" size={14} color={colors.subtext} />
                  <Text style={styles.metaText}>{item.expertIn.join(', ')}</Text>
                </View>
                <Text style={[styles.compatibleText, !item.expertIn.includes(appContext.vehicle.make) && styles.notCompatibleText]}>
                  {item.expertIn.includes(appContext.vehicle.make)
                    ? `Supports ${appContext.vehicle.make} vehicles`
                    : `May have limited support for ${appContext.vehicle.make}`}
                </Text>
              </View>
            </InfoCard>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16
  },
  heroCard: {
    backgroundColor: colors.card,
    padding: 18,
    borderRadius: 16,
    borderColor: colors.border,
    borderWidth: 1,
    marginBottom: 14
  },
  heroTitle: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 22
  },
  heroSubtitle: {
    color: colors.subtext,
    marginVertical: 10,
    fontSize: 15,
    lineHeight: 21
  },
  emergencyBtn: {
    backgroundColor: '#E5484D',
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50
  },
  emergencyBtnDisabled: {
    opacity: 0.75
  },
  emergencyIcon: {
    marginRight: 8
  },
  emergencyLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800'
  },
  detectingText: {
    marginTop: 8,
    color: colors.subtext,
    fontSize: 14
  },
  sectionTitle: {
    marginVertical: 10,
    color: colors.text,
    fontWeight: '700',
    fontSize: 17
  },
  listContent: {
    paddingBottom: 8
  },
  select: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 14
  },
  metaRow: {
    marginTop: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F4F7',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 5
  },
  metaText: {
    marginLeft: 5,
    color: colors.subtext,
    fontSize: 12,
    fontWeight: '600'
  },
  star: {
    color: '#FDB022',
    fontSize: 12
  },
  compatibleText: {
    marginTop: 6,
    color: colors.success,
    fontSize: 12,
    fontWeight: '700'
  },
  notCompatibleText: {
    color: colors.danger
  }
});
