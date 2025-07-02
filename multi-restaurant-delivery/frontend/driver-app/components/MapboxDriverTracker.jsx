import React, { useEffect, useRef, useState } from "react";
import MapboxGL from "@react-native-mapbox-gl/maps";
import io from "socket.io-client";

MapboxGL.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN || "");

export default function MapboxDriverTracker({ order }) {
  const mapRef = useRef();
  const [driverCoords, setDriverCoords] = useState(null);
  useEffect(() => {
    const socket = io(process.env.EXPO_PUBLIC_SOCKET_URL || "");
    socket.on(`driver-location:${order.driverId}`, coords => {
      if (mapRef.current && coords) {
        mapRef.current.flyTo([coords.lon, coords.lat]);
        setDriverCoords(coords);
      }
    });
    return () => socket.disconnect();
  }, [order.driverId]);
  return (
    <MapboxGL.MapView style={{ flex: 1 }} ref={mapRef}>
      {driverCoords && (
        <MapboxGL.PointAnnotation
          id="driver"
          coordinate={[driverCoords.lon, driverCoords.lat]}
        />
      )}
    </MapboxGL.MapView>
  );
}
