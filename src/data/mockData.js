export const vehicleCatalog = {
  Toyota: ['Corolla', 'Yaris', 'Fortuner'],
  Honda: ['Civic', 'City', 'BR-V'],
  Suzuki: ['Swift', 'Cultus', 'Wagon R'],
  Kia: ['Sportage', 'Picanto', 'Stonic']
};

export const nearbyMechanics = [
  {
    id: 'm1',
    name: 'RapidFix Garage',
    type: 'tow',
    rating: 4.8,
    eta: '12 mins',
    distance: '1.8 km',
    proximityNote: '1.8 km away',
    expertIn: ['Toyota', 'Honda']
  },
  {
    id: 'm2',
    name: 'City Auto Rescue',
    type: 'car',
    rating: 4.6,
    eta: '18 mins',
    distance: '2.4 km',
    proximityNote: '2.4 km away',
    expertIn: ['Suzuki', 'Kia']
  },
  {
    id: 'm3',
    name: 'Prime Mobile Mechanic',
    type: 'truck',
    rating: 4.9,
    eta: '22 mins',
    distance: '3.1 km',
    proximityNote: '3.1 km away',
    expertIn: ['Toyota', 'Kia', 'Honda']
  }
];

export const maintenanceServices = [
  { id: 's1', title: 'Oil Change', price: 49 },
  { id: 's2', title: 'Brake Service', price: 99 },
  { id: 's3', title: 'AC Repair', price: 120 },
  { id: 's4', title: 'General Inspection', price: 65 }
];

export const spareParts = [
  {
    id: 'p1',
    name: 'Battery',
    categories: [
      {
        id: 'maintenance-free',
        label: 'Maintenance Free',
        brands: [
          { id: 'osaka-batt', name: 'Osaka', price: 150, supportedModels: ['Corolla', 'Civic', 'City'] },
          { id: 'ags-batt', name: 'AGS', price: 165, supportedModels: ['Yaris', 'Swift', 'Picanto'] }
        ]
      }
    ]
  },
  {
    id: 'p2',
    name: 'Engine Oil',
    categories: [
      {
        id: 'synthetic-5w30',
        label: 'Synthetic 5W-30',
        brands: [
          { id: 'shell', name: 'Shell Helix', price: 35, supportedModels: ['Corolla', 'Civic', 'Sportage'] },
          { id: 'zic', name: 'ZIC X7', price: 32, supportedModels: ['City', 'Yaris', 'Wagon R'] }
        ]
      },
      {
        id: 'semi-10w40',
        label: 'Semi Synthetic 10W-40',
        brands: [
          { id: 'total', name: 'Total Quartz', price: 28, supportedModels: ['Cultus', 'Swift', 'Picanto'] },
          { id: 'caltex', name: 'Caltex Havoline', price: 30, supportedModels: ['Corolla', 'BR-V', 'Fortuner'] }
        ]
      }
    ]
  },
  {
    id: 'p3',
    name: 'Air Filter',
    categories: [
      {
        id: 'paper-filter',
        label: 'Paper Filter',
        brands: [
          { id: 'vic', name: 'VIC', price: 25, supportedModels: ['Corolla', 'City', 'Swift'] },
          { id: 'guard', name: 'Guard', price: 23, supportedModels: ['Civic', 'Yaris', 'Cultus'] }
        ]
      },
      {
        id: 'performance-filter',
        label: 'Performance Filter',
        brands: [
          { id: 'k&n', name: 'K&N', price: 42, supportedModels: ['Civic', 'Sportage', 'Fortuner'] }
        ]
      }
    ]
  },
  {
    id: 'p4',
    name: 'Brake Pads',
    categories: [
      {
        id: 'ceramic',
        label: 'Ceramic',
        brands: [
          { id: 'bendix', name: 'Bendix', price: 85, supportedModels: ['Corolla', 'Civic', 'BR-V'] },
          { id: 'trw', name: 'TRW', price: 88, supportedModels: ['City', 'Yaris', 'Stonic'] }
        ]
      },
      {
        id: 'semi-metallic',
        label: 'Semi-Metallic',
        brands: [
          { id: 'bosch', name: 'Bosch', price: 79, supportedModels: ['Swift', 'Cultus', 'Wagon R'] }
        ]
      }
    ]
  }
];

export const trackingUpdates = [
  'Request accepted',
  'Mechanic preparing tools',
  'Mechanic on the way',
  'Arriving soon'
];
