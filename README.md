# Next.js ELD Mapping Web App Documentation

## Overview
This web application is built with Next.js and integrates the following key features:
- Fetches the user's current location from an API.
- Uses an autocomplete feature for selecting pickup and drop-off locations.
- Plots an ELD (Electronic Logging Device) diagram.
- Displays a Mapbox-powered map showing the current location, pickup, and drop-off points.

## Technologies Used
- **Next.js** (Frontend framework)
- **React.js** (Component-based UI development)
- **Mapbox** (Interactive mapping and geolocation)
- **Recharts** (For ELD graph plotting)
- **Geolocation API** (To fetch the user's current location from ip address)
- **Autocomplete API** (For location selection)
- **React Query** (For data fetching and caching)

## Features
### 1. Current Location Retrieval
- The application fetches the user's real-time location using the Geolocation API.
- The retrieved latitude and longitude are displayed on the UI and plotted on the map.

### 2. Autocomplete for Pickup & Drop-off Locations
- Users can search for locations using an autocomplete input field.
- The selected locations are stored and displayed on the map.

### 3. ELD Graph Plotting
- The app generates an ELD graph to track driver work hours.
- The graph follows a **70-hour/8-day** working cycle with straight-line segments.
- Time is divided into 15-minute intervals for accuracy.

### 4. Mapbox Integration
- The map displays:
  - The user's current location (fetched via API).
  - Pickup and drop-off locations (selected via autocomplete).
- Map markers indicate all three locations.
- Routes between pickup and drop-off locations are plotted.

## Installation & Setup
### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn package manager
- A Mapbox API key

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Neon-jeff/spotter-ai-nextjs-react-.git
   cd nextjs-eld-map
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Set up environment variables:**
   Create a `.env.local` file and add:
  ```env
  NEXT_PUBLIC_MAPBOX_API_TOKEN=map-box-token
  NEXT_PUBLIC_GEOAPI_KEY=geo-api-key
  NEXT_PUBLIC_GEOAPI_URL=https://api.geoapify.com/v1/geocode/autocomplete
  NEXT_PUBLIC_BACKEND_URL=https://web-production-7a56.up.railway.app/api
```
4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. **Open the app in your browser:**
   ```
   http://localhost:3000
   ```

## Backend
1. Rest API built with django and django rest framework
2. API URL : https://web-production-7a56.up.railway.app/api
3. Backend Repo : https://github.com/Neon-jeff/spotter-ai-django



## Usage
1. Enter a pickup location using the autocomplete input.
2. Enter a drop-off location.
3. The app retrieves the current location automatically.
4. The map updates to display all three locations.
5. The ELD graph dynamically updates to reflect driving time.

## Deployment
To deploy on Vercel:
```bash
npx vercel
```
Follow the prompts to set up your deployment.

## Future Enhancements
- Implement historical ELD log tracking.
- Enhance route optimization with waypoints.
- Google map implementation

## License
MIT License. See `LICENSE` file for details.

## Contact
For issues or contributions, please open an issue on GitHub.

