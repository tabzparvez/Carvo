# AutoRescue MVP (Pakistan Demo)

On-demand roadside assistance app (Uber/Careem style for car problems), not a car-selling app.

## Modules

### 1) Emergency
- Big red Emergency button
- Service category selection (Engine, Battery, Tyre, Towing, Maintenance)
- Problem selection only after service is selected
- Karachi-style mock map with mechanic markers
- Mechanic cards with rating, ETA, distance, availability, supported brands, PKR estimate
- Request Service flow + tracking statuses: Requested → Accepted → On the way → Completed

### 2) Maintenance
- Uses default user vehicle
- Services with PKR estimated ranges
- Recommended parts shown per service
- Date/time booking + optional mechanic preference

### 3) Parts
- Categories: Engine Oil, Tyres, Battery, Spark Plugs, Filters
- Brand selection + quantity selector
- Smart recommendations based on mileage (oil type, tyre size, battery, brands)
- Cart + order confirmation in PKR

## Auth + Vehicle
- Signup: Full Name, Mobile Number, OTP, Password
- Post-signup Add Vehicle screen with Skip
- Vehicle management (add multiple, set default, edit demo, delete)

## Run
```bash
npm install
npm run start
```

> Demo mode only: static data, no backend/API.
