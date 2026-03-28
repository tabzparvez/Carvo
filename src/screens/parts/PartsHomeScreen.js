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
  const [qtyMap, setQtyMap] = useState({});
  const { vehicle } = appContext;

  const resolvedParts = useMemo(() => {
    const withSelection = spareParts.map((part) => {
      const selectedCategoryId = selectionMap[part.id]?.categoryId || part.categories[0].id;
      const selectedCategory = part.categories.find((c) => c.id === selectedCategoryId) || part.categories[0];
      const selectedBrandId = selectionMap[part.id]?.brandId || selectedCategory.brands[0].id;
      const selectedBrand = selectedCategory.brands.find((b) => b.id === selectedBrandId) || selectedCategory.brands[0];
      const compatible = selectedBrand.compatibility.some(
        (c) => c.make === vehicle.make && c.model === vehicle.model && c.years.includes(vehicle.year)
      );

      return {
        ...part,
        selectedCategory,
        selectedBrand,
        compatible,
        quantity: qtyMap[part.id] || 1
      };
    });

    return withSelection.filter((part) =>
      part.categories.some((cat) =>
        cat.brands.some((brand) =>
          brand.compatibility.some(
            (c) => c.make === vehicle.make && c.model === vehicle.model && c.years.includes(vehicle.year)
          )
        )
      )
    );
  }, [selectionMap, qtyMap, vehicle]);

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

  const changeQty = (partId, increment) => {
    setQtyMap((prev) => {
      const current = prev[partId] || 1;
      return { ...prev, [partId]: Math.max(1, current + increment) };
    });
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
        qty: part.quantity,
        oemRecommended: part.selectedBrand.oemRecommended,
        vehicleLabel: `${vehicle.make} ${vehicle.model} ${vehicle.year}`
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
        ListEmptyComponent={<Text style={styles.empty}>No compatible parts found for selected car.</Text>}
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
                  <Text style={[styles.chipText, item.selectedBrand.id === brand.id && styles.chipTextActive]}>{brand.name}</Text>
                </Pressable>
              ))}
            </View>

            <Text style={[styles.compatibility, !item.compatible && styles.notCompatible]}>
              {item.compatible
                ? `Compatible with ${vehicle.make} ${vehicle.model} (${vehicle.year})`
                : `Not compatible with selected car`}
            </Text>
            <Text style={styles.oem}>{item.selectedBrand.oemRecommended ? 'OEM Recommended' : 'Aftermarket Option'}</Text>

            <View style={styles.qtyRow}>
              <Text style={styles.smallLabel}>Quantity</Text>
              <View style={styles.qtyControls}>
                <Pressable style={styles.qtyBtn} onPress={() => changeQty(item.id, -1)}>
                  <Text style={styles.qtyBtnText}>-</Text>
                </Pressable>
                <Text style={styles.qtyValue}>{item.quantity}</Text>
                <Pressable style={styles.qtyBtn} onPress={() => changeQty(item.id, 1)}>
                  <Text style={styles.qtyBtnText}>+</Text>
                </Pressable>
              </View>
            </View>

            <Pressable
              style={[styles.orderBtn, !item.compatible && styles.orderBtnDisabled]}
              onPress={() => addToCart(item)}
              disabled={!item.compatible}
            >
              <Text style={styles.orderText}>Add to Cart</Text>
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
  empty: {
    textAlign: 'center',
    color: colors.subtext,
    marginTop: 20
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
  oem: {
    marginTop: 4,
    color: colors.subtext,
    fontSize: 12,
    fontWeight: '600'
  },
  qtyRow: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  qtyBtnText: {
    fontWeight: '700',
    color: colors.text
  },
  qtyValue: {
    minWidth: 20,
    textAlign: 'center',
    fontWeight: '700',
    color: colors.text
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
