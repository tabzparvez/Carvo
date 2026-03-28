export const vehicleMaster = {
  Toyota: ['Corolla', 'Yaris', 'Hilux'],
  Honda: ['Civic', 'City', 'BR-V'],
  Suzuki: ['Swift', 'Cultus', 'Wagon R'],
  Kia: ['Sportage', 'Picanto', 'Stonic'],
  Hyundai: ['Elantra', 'Sonata', 'Tucson'],
  Changan: ['Alsvin', 'Oshan X7'],
  MG: ['MG HS', 'MG ZS'],
  Peugeot: ['2008'],
  Isuzu: ['D-Max']
};

export const yearOptions = [2018, 2019, 2020, 2021, 2022, 2023, 2024];
export const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'EV'];

export const serviceCategories = [
  { id: 'engine', title: 'Engine Issue', icon: 'construct' },
  { id: 'battery', title: 'Battery', icon: 'battery-charging' },
  { id: 'tyre', title: 'Tyre', icon: 'ellipse' },
  { id: 'towing', title: 'Towing', icon: 'car' },
  { id: 'maintenance', title: 'Maintenance', icon: 'build' }
];

export const problemOptions = [
  'Car not starting',
  'Battery dead',
  'Flat tyre',
  'Engine overheating',
  'Out of fuel'
];

export const nearbyMechanics = [
  {
    id: 'm1',
    name: 'Gulshan Auto Rescue',
    rating: 4.8,
    eta: '12 min',
    distance: '1.9 km',
    availability: 'Available',
    specialization: ['Engine', 'Brake'],
    supportedBrands: ['Toyota', 'Honda', 'Kia'],
    priceEstimatePkr: '₨ 4,500 - ₨ 9,000',
    location: { x: 22, y: 40 }
  },
  {
    id: 'm2',
    name: 'Bahadurabad Workshop',
    rating: 4.6,
    eta: '18 min',
    distance: '2.7 km',
    availability: 'Busy',
    specialization: ['Battery', 'Electrical', 'AC'],
    supportedBrands: ['Suzuki', 'Hyundai', 'Changan'],
    priceEstimatePkr: '₨ 3,500 - ₨ 8,000',
    location: { x: 62, y: 32 }
  },
  {
    id: 'm3',
    name: 'Korangi 24/7 Towing',
    rating: 4.9,
    eta: '20 min',
    distance: '3.4 km',
    availability: 'Available',
    specialization: ['Tyre', 'Towing', 'General'],
    supportedBrands: ['Toyota', 'Honda', 'Suzuki', 'Kia', 'MG'],
    priceEstimatePkr: '₨ 5,000 - ₨ 12,000',
    location: { x: 45, y: 68 }
  }
];

export const trackingUpdates = ['Requested', 'Accepted', 'On the way', 'Completed'];

export const maintenanceServices = [
  {
    id: 's1',
    title: 'Oil Change',
    priceRangePkr: '₨ 3,000 - ₨ 7,500',
    recommendedParts: ['5W-30 Fully Synthetic', 'OEM Oil Filter']
  },
  {
    id: 's2',
    title: 'Brake Service',
    priceRangePkr: '₨ 5,500 - ₨ 12,000',
    recommendedParts: ['Ceramic Brake Pads', 'DOT4 Brake Fluid']
  },
  {
    id: 's3',
    title: 'AC Repair',
    priceRangePkr: '₨ 4,500 - ₨ 14,000',
    recommendedParts: ['Cabin Filter', 'AC Gas R134a']
  },
  {
    id: 's4',
    title: 'General Inspection',
    priceRangePkr: '₨ 2,000 - ₨ 5,000',
    recommendedParts: ['Diagnostic Scan', 'Safety checklist']
  }
];

export const partsCatalog = [
  {
    id: 'pc1',
    category: 'Engine Oil',
    brands: ['Shell', 'Castrol', 'Liqui Moly', 'Mobil', 'Total']
  },
  {
    id: 'pc2',
    category: 'Tyres',
    brands: ['General', 'Dunlop', 'Bridgestone', 'Michelin', 'Yokohama']
  },
  {
    id: 'pc3',
    category: 'Battery',
    brands: ['AGS', 'Osaka', 'Exide']
  },
  {
    id: 'pc4',
    category: 'Spark Plugs',
    brands: ['NGK', 'Denso']
  },
  {
    id: 'pc5',
    category: 'Filters',
    brands: ['VIC', 'Guard', 'Bosch']
  }
];

export const smartRecommendations = {
  lowMileage: {
    oilType: '5W-30 Synthetic',
    tyreSize: '195/65/R15',
    battery: 'AGS 45Ah',
    suggestedBrands: ['Shell', 'Castrol', 'Bridgestone']
  },
  highMileage: {
    oilType: '10W-40 High Mileage',
    tyreSize: '185/65/R15',
    battery: 'Osaka 50Ah',
    suggestedBrands: ['Total', 'Liqui Moly', 'General']
  }
};
