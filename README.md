## About

React application that uses Google Maps API Directions Service to return efficient time and travel path between multiple locations. Display the total distance and total duration and plot the driving directions and route on map.

Use Case:
- One can enter source and destination address; For the address field, google places autocomplete is implemented.
- One can also add multiple waypoints/stops between source and destination address.
- Onchange in any address field, The Map and the Directions service is initialized to plot the driving directions and route on map and display the total distance and total duration.

Feel free to leave a ⭐ as motivation if this was useful to you 😊

## Requirements

- Node >= 14.0.0
- npm >= 5.6
- Google Maps API key 
- Enable Directions API library in Google Cloud Console 
- Include Maps JavaScript Library - Place your api key in public/index.html

## Context
```bash
- React 18.2.0
- Packages:
  - @react-google-maps/api
  - @mui/material
  - use-places-autocomplete
  - formik
  - node-sass
```

## Getting started

```bash
# Clone the repo
git clone
cd react-google-directions-service

# Install npm packages
npm install

# Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files
npm start

```

## Building the project

```bash

# Build artifacts will be stored in the `build/` directory.
npm run build

```
