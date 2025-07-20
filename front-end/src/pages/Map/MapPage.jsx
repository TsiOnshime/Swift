import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Define Addis Ababa bounds (approximate)
const addisBounds = [
  [8.95, 38.65],   // Southwest corner (lat, lng)
  [9.15, 39.00],   // Northeast corner (lat, lng)
];

function FlyToLocation({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 16);
    }
  }, [position, map]);
  return null;
}

const MapPage = () => {
  const navigate = useNavigate();
  const [scooters, setScooters] = useState([]);
  const [selected, setSelected] = useState(null);
  const [userLocation, setUserLocation] = useState([9.005401, 38.763611]); // Default: Addis Ababa

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setUserLocation([pos.coords.latitude, pos.coords.longitude])
      );
    }
  }, []);

  // Fetch available scooters from backend
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/v1/scooters`)
      .then(res => setScooters(res.data))
      .catch(() => setScooters([]));
  }, []);

  // Get directions link (Google Maps)
  const getDirectionsUrl = (lat, lng) =>
    `https://www.google.com/maps/dir/?api=1&origin=${userLocation[0]},${userLocation[1]}&destination=${lat},${lng}&travelmode=walking`;

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      {/* Back Button */}
      <button
        onClick={() => navigate('/home')}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 1000,
          background: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "10px 18px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        ← Back
      </button>
      <MapContainer
        center={userLocation}
        zoom={15}
        minZoom={12}
        maxZoom={18}
        style={{ height: "100%", width: "100%" }}
        maxBounds={addisBounds}
        maxBoundsViscosity={1.0}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {/* User marker */}
        <Marker position={userLocation} icon={redIcon}>
          <Popup>Your Location</Popup>
        </Marker>
        {/* Scooter markers */}
        {scooters.map(scooter => (
          <Marker
            key={scooter._id}
            position={[
              scooter.location.coordinates[1],
              scooter.location.coordinates[0],
            ]}
            eventHandlers={{
              click: () => setSelected(scooter),
            }}
          >
            <Popup>
              
              <b>Battery:</b> {scooter.batteryLevel}%
              <br />
              <b>Price/min:</b> {scooter.rentalPricePerMinute} ETB
              <br />
              <a
                href={getDirectionsUrl(
                  scooter.location.coordinates[1],
                  scooter.location.coordinates[0]
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Directions
              </a>
            </Popup>
          </Marker>
        ))}
        {/* Fly to selected scooter */}
        {selected && (
          <FlyToLocation
            position={[
              selected.location.coordinates[1],
              selected.location.coordinates[0],
            ]}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapPage;