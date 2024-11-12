import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { ShieldCheckIcon, ShieldExclamationIcon } from '@heroicons/react/24/solid';

function App() {
  const [isAlertMode, setIsAlertMode] = useState(false);
  const [location, setLocation] = useState({ lat: 51.505, lng: -0.09 });
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate location changes
      setLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001
      }));
      setLastUpdate(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Motorbike Security System</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm">
              Last Update: {lastUpdate.toLocaleTimeString()}
            </span>
            <button
              onClick={() => setIsAlertMode(!isAlertMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                isAlertMode 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isAlertMode ? (
                <ShieldExclamationIcon className="h-5 w-5" />
              ) : (
                <ShieldCheckIcon className="h-5 w-5" />
              )}
              {isAlertMode ? 'Disable Alert Mode' : 'Enable Alert Mode'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative">
        <MapContainer
          center={[location.lat, location.lng]}
          zoom={13}
          className="h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[location.lat, location.lng]}>
            <Popup>
              Your motorbike is here!<br />
              Status: {isAlertMode ? '🚨 Alert Mode' : '✅ Safe'}
            </Popup>
          </Marker>
        </MapContainer>

        {/* Status Overlay */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 p-4 rounded-lg shadow-lg backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-600">Location</h3>
              <p className="text-lg">
                {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600">Status</h3>
              <p className={`text-lg ${isAlertMode ? 'text-red-600' : 'text-green-600'}`}>
                {isAlertMode ? '🚨 Alert Mode Active' : '✅ System Armed'}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;