import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import InfoCard from '../../components/InfoCard';
import PrimaryButton from '../../components/PrimaryButton';
import VehicleSelectorCard from '../../components/VehicleSelectorCard';
import { spareParts } from '../../data/mockData';
import { colors } from '../../styles/theme';

export default function PartsHomeScreen({ navigation, appContext }) {
  const [cart, setCart] = useState([]);
  const [selectionMap, setSelectionMap] = useState({});
  const { vehicle } = appContext;

  const resolvedParts = useMemo(() => {
    return spareParts.map((part) => {
      const selectedCategoryId = selectionMap[part.id]?.categoryId || part.categories[0].id;
      const selectedCategory = part.categories.find((c) => c.id === selectedCategoryId) || part.categories[0];
      const selectedBrandId = selectionMap[part.id]?.brandId || selectedCategory.brands[0].id;
      const selectedBrand = selectedCategory.brands.find((b) => b.id === selectedBrandId) || selectedCategory.brands[0];

      return {
        ...part,
        selectedCategory,
        selectedBrand,
        compatible: selectedBrand.supportedModels.includes(vehicle.model)
      };
    });
  }, [selectionMap, vehicle.model]);

  const setCategory = (partId, categoryId) => {
    const part = spareParts.find((item) => item.id === partId);
    const firstBrand = part.categories.find((c) => c.id === categoryId)?.brands[0];
    setSelectionMap((prev) => ({
      ...prev,
      [partId]: {
        categoryId,
        brandId: firstBrand?.id
      }
    }));
  };

  const setBrand = (partId, brandId) => {
    setSelectionMap((prev) => ({
      ...prev,
      [partId]: {
        ...(prev[partId] || {}),
        brandId
      }
    }));
  };

  const addToCart = (part) => {
    setCart((prev) => [
      ...prev,
      {
        id: part.id,
        name: part.name,
        category: part.selectedCategory.label,
        brand: part.selectedBrand.name,
        price: part.selectedBrand.price,
        vehicleModel: vehicle.model
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.heading}>Marketplace</Text>
        <Pressable onPress={() => navigation.navigate('History')}>
          <Text style={styles.history}>Order History</Text>
        </Pressable>
      </View>

      <VehicleSelectorCard vehicle={vehicle} setVehicle={appContext.setVehicle} />

      <FlatList
        data={resolvedParts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <InfoCard
            title={item.name}
            subtitle={`Selected: ${item.selectedBrand.name}`}
            rightNode={<Text style={styles.price}>${item.selectedBrand.price}</Text>}
          >
            <Text style={styles.smallLabel}>Category</Text>
            <View style={styles.optionRow}>
              {item.categories.map((cat) => (
                <Pressable
                  key={cat.id}
                  style={[styles.chip, item.selectedCategory.id === cat.id && styles.chipActive]}
                  onPress={() => setCategory(item.id, cat.id)}
                >
                  <Text style={[styles.chipText, item.selectedCategory.id === cat.id && styles.chipTextActive]}>{cat.label}</Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.smallLabel}>Brand</Text>
            <View style={styles.optionRow}>
              {item.selectedCategory.brands.map((brand) => (
                <Pressable
                  key={brand.id}
                  style={[styles.chip, item.selectedBrand.id === brand.id && styles.chipActive]}
                  onPress={() => setBrand(item.id, brand.id)}
                >
                  <Text style={[styles.chipText, item.selectedBrand.id === brand.id && styles.chipTextActive]}>
                    {brand.name}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={[styles.compatibility, !item.compatible && styles.notCompatible]}>
              {item.compatible
                ? `Compatible with your ${vehicle.make} ${vehicle.model}`
                : `Not ideal for ${vehicle.model}. Supported: ${item.selectedBrand.supportedModels.join(', ')}`}
            </Text>

            <Pressable
              style={[styles.orderBtn, !item.compatible && styles.orderBtnDisabled]}
              onPress={() => addToCart(item)}
              disabled={!item.compatible}
            >
              <Text style={styles.orderText}>Order</Text>
            </Pressable>
          </InfoCard>
        )}
      />

      <PrimaryButton
        label={`Go to Cart (${cart.length})`}
        onPress={() => navigation.navigate('Cart', { cart })}
        disabled={cart.length === 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
    gap: 10
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  heading: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text
  },
  history: {
    color: colors.primary,
    fontWeight: '700'
  },
  smallLabel: {
    marginTop: 8,
    marginBottom: 4,
    color: colors.subtext,
    fontSize: 12,
    fontWeight: '700'
  },
  optionRow: {
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
  compatibility: {
    marginTop: 8,
    color: colors.success,
    fontSize: 12,
    fontWeight: '700'
  },
  notCompatible: {
    color: colors.danger
  },
  price: {
    fontWeight: '800',
    color: colors.primary
  },
  orderBtn: {
    marginTop: 8,
    borderRadius: 10,
    backgroundColor: colors.primarySoft,
    paddingVertical: 10,
    alignItems: 'center'
  },
  orderBtnDisabled: {
    opacity: 0.4
  },
  orderText: {
    color: colors.primary,
    fontWeight: '700'
  }
});
