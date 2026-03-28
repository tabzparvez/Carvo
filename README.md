# AutoRescue MVP (React Native + Expo)

A demo mobile app prototype for **roadside assistance**, **home maintenance booking**, and **spare parts marketplace**.

## Features

### 1) Emergency Module
- Emergency button to trigger roadside help
- Mock GPS location detection
- Nearby mechanics list (dummy data)
- Mechanic details (name, rating, ETA, distance)
- Dummy call button
- Booking + tracking updates screen
- Success confirmation screen

### 2) Maintenance Module
- Services list:
  - Oil Change
  - Brake Service
  - AC Repair
  - General Inspection
- Fixed dummy prices
- Date/time picker for scheduling
- Booking confirmation + success screen

### 3) Spare Parts Marketplace
- Product list:
  - Battery
  - Engine Oil
  - Air Filter
  - Brake Pads
- Price + Order button
- Simple cart flow
- Order confirmation screen
- Optional order history screen

### General
- Login/Signup UI (mock auth)
- Bottom navigation with 3 tabs: Emergency, Maintenance, Parts
- Modern clean UI using reusable components
- Static/dummy data only (no API / payment / real map)

---

## Project Structure

```text
.
├── App.js
├── package.json
└── src
    ├── components
    │   ├── InfoCard.js
    │   └── PrimaryButton.js
    ├── data
    │   └── mockData.js
    ├── navigation
    │   └── RootNavigator.js
    ├── screens
    │   ├── auth/AuthScreen.js
    │   ├── emergency/*
    │   ├── maintenance/*
    │   ├── parts/*
    │   ├── OrderHistoryScreen.js
    │   └── SuccessScreen.js
    └── styles/theme.js
```

## Run Locally

### Prerequisites
- Node.js 18+
- npm
- Expo Go app (optional for physical device)

### Steps
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start app:
   ```bash
   npm run start
   ```
3. Open on:
   - Android emulator (`a` in Expo terminal)
   - iOS simulator (`i` in Expo terminal on macOS)
   - Expo Go (scan QR)

## Notes
- This is an MVP demo for idea validation.
- Data and flows are intentionally mocked.
