# IoT-Enabled Tile for Controlled Substance Inventory Tracking and Access Verification

Smart Tile Tracker is a React-based frontend dashboard for an IoT inventory tracking project. It provides a clean interface for viewing registered smart tiles, adding tracked items, reviewing live weight metrics, calculating item counts, and managing individual tile records.

The project is based on a sensor-fusion smart storage tile. The tile uses load-cell weight sensing, RFID verification, IR motion confirmation, environmental sensing, and camera evidence to improve accountability for sensitive or high-value inventory. Sensor readings are processed by an ESP32 device and sent to a backend Node.js server for session handling, item-count calculation, anomaly checks, alert generation, and storage.

## Tech Stack

- React
- React Router v6
- Vite
- Tailwind CSS
- ESP32 device interface
- Node.js and Express backend interface

## Project Features

- Dashboard home page for registered smart tiles
- Add Tile modal with title, description, image upload, and calibration note
- Tile management page with live metric cards
- Single unit weight, total real-time weight, and calculated item count display
- Delete Tile confirmation flow
- About page with project synopsis and system overview

## Installation

1. Open a terminal in the frontend project folder.

2. Install project dependencies:

```bash
npm install
```

3. Start the frontend development server:

```bash
npm run dev
```

4. Open the local URL shown in the terminal. By default, Vite usually runs at:

```bash
http://localhost:5173/
```

On Windows PowerShell, if `npm` is blocked by script execution policy, use:

```bash
npm.cmd run dev
```

## Available Scripts

```bash
npm run dev
```

Starts the local development server.

```bash
npm run build
```

Creates a production build in the `dist` folder.

```bash
npm run preview
```

Previews the production build locally.

## Project Structure

```text
src/
  components/
    AddTileModal.jsx
    Navbar.jsx
    TileCard.jsx
  pages/
    AboutPage.jsx
    HomePage.jsx
    ManagePage.jsx
  App.jsx
  main.jsx
  styles.css
```

## Notes

- The current tile data is mock frontend state.
- Backend API integration is not connected yet.
- Uploaded item images are previewed locally in the browser for now.
- The dashboard is intended to connect with the ESP32 firmware and backend Node.js server in later integration steps.
