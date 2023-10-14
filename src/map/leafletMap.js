import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'
import Papa from 'papaparse';
import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from "react-leaflet-cluster";
import MarkerInfo from './markerInfo';
import { defaultMarker, activeMarker, redMarker, orangeMarker, yellowMarker, greenMarker } from '../constants/markerIcon';

delete L.Icon.Default.prototype._getIconUrl;

function LeafletMap({ residencesDatas }) {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  return (
    <div>
      <MapContainer center={[43.6065089, 3.8917325]} zoom={13} minZoom={11} maxZoom={18} style={{ height: '90vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

      {/* <MarkerClusterGroup> */}
        {residencesDatas.map((marker, index) => (
          <Marker
            key={index}
            position={[marker.latitude, marker.longitude]}
            eventHandlers={{ click: () => handleMarkerClick(marker) }}
            icon={ selectedMarker && selectedMarker.id === marker.id ? activeMarker : defaultMarker }
          >
          </Marker>
        ))}
      {/* </MarkerClusterGroup> */}
      </MapContainer>
      <MarkerInfo selectedMarker={selectedMarker} />
    </div>
  );
}

export default LeafletMap;
