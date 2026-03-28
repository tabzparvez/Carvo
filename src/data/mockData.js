export const cars = [
  { id: 1, make: 'Toyota', model: 'Corolla', year: 2021 },
  { id: 2, make: 'Toyota', model: 'Yaris', year: 2020 },
  { id: 3, make: 'Honda', model: 'Civic', year: 2020 },
  { id: 4, make: 'Honda', model: 'City', year: 2022 },
  { id: 5, make: 'Suzuki', model: 'Swift', year: 2021 },
  { id: 6, make: 'Suzuki', model: 'Cultus', year: 2019 },
  { id: 7, make: 'Kia', model: 'Sportage', year: 2023 },
  { id: 8, make: 'Kia', model: 'Picanto', year: 2021 }
];

export const nearbyMechanics = [
  {
    id: 'm1',
    name: 'RapidFix Garage',
    type: 'tow',
    rating: 4.8,
    eta: '12 mins',
    distance: '1.8 km',
    proximityNote: '1.8 km away',
    specialization: ['Engine', 'Brake'],
    costRange: '$40 - $120',
    supportedVehicles: [
      { make: 'Toyota', model: 'Corolla' },
      { make: 'Honda', model: 'Civic' },
      { make: 'Honda', model: 'City' }
    ]
  },
  {
    id: 'm2',
    name: 'City Auto Rescue',
    type: 'car',
    rating: 4.6,
    eta: '18 mins',
    distance: '2.4 km',
    proximityNote: '2.4 km away',
    specialization: ['AC', 'General'],
    costRange: '$30 - $100',
    supportedVehicles: [
      { make: 'Suzuki', model: 'Swift' },
      { make: 'Suzuki', model: 'Cultus' },
      { make: 'Kia', model: 'Picanto' }
    ]
  },
  {
    id: 'm3',
    name: 'Prime Mobile Mechanic',
    type: 'truck',
    rating: 4.9,
    eta: '22 mins',
    distance: '3.1 km',
    proximityNote: '3.1 km away',
    specialization: ['Engine', 'AC', 'Brake'],
    costRange: '$50 - $150',
    supportedVehicles: [
      { make: 'Toyota', model: 'Corolla' },
      { make: 'Kia', model: 'Sportage' },
      { make: 'Honda', model: 'Civic' }
    ]
  }
];

export const maintenanceServices = [
  {
    id: 's1',
    title: 'Oil Change',
    basePrice: 49,
    priceRange: '$40 - $70',
    recommendedParts: ['Engine Oil 5W-30', 'Oil Filter OEM']
  },
  {
    id: 's2',
    title: 'Brake Service',
    basePrice: 99,
    priceRange: '$80 - $140',
    recommendedParts: ['Ceramic Brake Pads', 'Brake Fluid DOT4']
  },
  {
    id: 's3',
    title: 'AC Repair',
    basePrice: 120,
    priceRange: '$90 - $180',
    recommendedParts: ['Cabin Air Filter', 'AC Gas R134a']
  },
  {
    id: 's4',
    title: 'General Inspection',
    basePrice: 65,
    priceRange: '$50 - $90',
    recommendedParts: ['Diagnostic Scan', 'Multi-point checklist']
  }
];

export const spareParts = [
  {
    id: 'p2',
    name: 'Engine Oil',
    categories: [
      {
        id: 'synthetic-5w30',
        label: 'Synthetic 5W-30',
        brands: [
          {
            id: 'shell',
            name: 'Shell Helix',
            price: 35,
            oemRecommended: true,
            compatibility: [
              { make: 'Toyota', model: 'Corolla', years: [2020, 2021, 2022] },
              { make: 'Honda', model: 'Civic', years: [2019, 2020, 2021] }
            ]
          },
          {
            id: 'zic',
            name: 'ZIC X7',
            price: 32,
            oemRecommended: false,
            compatibility: [
              { make: 'Honda', model: 'City', years: [2021, 2022] },
              { make: 'Suzuki', model: 'Swift', years: [2020, 2021] }
            ]
          }
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
          {
            id: 'vic',
            name: 'VIC',
            price: 25,
            oemRecommended: true,
            compatibility: [
              { make: 'Toyota', model: 'Corolla', years: [2020, 2021] },
              { make: 'Honda', model: 'City', years: [2021, 2022] }
            ]
          }
        ]
      },
      {
        id: 'performance-filter',
        label: 'Performance Filter',
        brands: [
          {
            id: 'kn',
            name: 'K&N',
            price: 42,
            oemRecommended: false,
            compatibility: [
              { make: 'Honda', model: 'Civic', years: [2020, 2021] },
              { make: 'Kia', model: 'Sportage', years: [2022, 2023] }
            ]
          }
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
          {
            id: 'bendix',
            name: 'Bendix',
            price: 85,
            oemRecommended: true,
            compatibility: [
              { make: 'Toyota', model: 'Corolla', years: [2020, 2021, 2022] },
              { make: 'Honda', model: 'Civic', years: [2020, 2021] }
            ]
          },
          {
            id: 'bosch',
            name: 'Bosch',
            price: 79,
            oemRecommended: false,
            compatibility: [
              { make: 'Suzuki', model: 'Swift', years: [2020, 2021] },
              { make: 'Suzuki', model: 'Cultus', years: [2019, 2020] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'p1',
    name: 'Battery',
    categories: [
      {
        id: 'maintenance-free',
        label: 'Maintenance Free',
        brands: [
          {
            id: 'osaka-batt',
            name: 'Osaka',
            price: 150,
            oemRecommended: true,
            compatibility: [
              { make: 'Toyota', model: 'Corolla', years: [2020, 2021] },
              { make: 'Honda', model: 'City', years: [2021, 2022] }
            ]
          }
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
