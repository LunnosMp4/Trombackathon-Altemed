import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'
import Papa from 'papaparse';
import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from "react-leaflet-cluster";
import MarkerInfo from './markerInfo';
import { defaultMarker, activeMarker, redMarker, orangeMarker, yellowMarker, greenMarker } from '../constants/markerIcon';
import './leafletMap.css'

delete L.Icon.Default.prototype._getIconUrl;

function LeafletMap({ residencesDatas, onMarkerClick, followedResidences }) {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapRef = useRef();

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    if (onMarkerClick)
      onMarkerClick(marker);
      if (mapRef.current)
        mapRef.current.setView([marker.latitude, marker.longitude], 15);
  };

  return (
    <div>
      <MapContainer ref={mapRef} center={[43.6065089, 3.8917325]} zoom={13} minZoom={11} maxZoom={18} style={{ height: '95vh', width: '100%' }}>
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
            icon={ selectedMarker && selectedMarker.id === marker.id ? activeMarker : followedResidences.includes(marker.id) ? yellowMarker : defaultMarker}
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
