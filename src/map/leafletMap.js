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

  const getAllResidents = (residence) => {
    const inf18 = parseInt(residence.inf18, 10) || 0;
    const from18to24 = parseInt(residence.from18to24, 10) || 0;
    const from25to49 = parseInt(residence.from25to49, 10) || 0;
    const from50to64 = parseInt(residence.from50to64, 10) || 0;
    const from65to74 = parseInt(residence.from65to74, 10) || 0;
    const sup75 = parseInt(residence.sup75, 10) || 0;
  
    return inf18 + from18to24 + from25to49 + from50to64 + from65to74 + sup75;
  }

  const getMarkerSize = (marker) => {
    const residents = getAllResidents(marker);

    if (residents <= 20)
      return [12.5, 19];
    if (residents <= 50)
      return [17.5, 26.6];
    if (residents <= 100)
      return [25, 38];
    if (residents <= 200)
      return [32.5, 49.3];
    return [40, 60];
  };

  const getMarkerAnchor = (marker) => {
    const residents = getAllResidents(marker);

    if (residents <= 20)
      return [8, 25];
    if (residents <= 50)
      return [12, 37];
    if (residents <= 100)
      return [12, 41];
    if (residents <= 200)
      return [12, 49];
    return [12, 60];
  }

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
            icon={
              selectedMarker && selectedMarker.id === marker.id
                ? activeMarker
                : followedResidences.includes(marker.id)
                ? yellowMarker
                : new L.Icon({
                    iconUrl: require('../icons/markerBlue.png'),
                    iconAnchor: getMarkerAnchor(marker),
                    iconSize: getMarkerSize(marker),
                  })
            }
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
