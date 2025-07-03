import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';

function LocateButton() {
  const map = useMap();
  return (
    <button
      className="absolute top-4 right-4 z-10 bg-white p-2 rounded shadow"
      onClick={() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(pos => {
            map.setView([pos.coords.latitude, pos.coords.longitude], 15);
          });
        }
      }}
    >
      Standort
    </button>
  );
}

export default function DriverMap() {
  const [position, setPosition] = useState<[number, number]>([52.52, 13.405]);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, []);
  return (
    <div style={{ height: 400, width: '100%', position: 'relative' }}>
      <MapContainer center={position} zoom={13} style={{ height: 400, width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
        <Marker position={position}>
          <Popup>Mein Standort</Popup>
        </Marker>
        <LocateButton />
      </MapContainer>
    </div>
  );
}
