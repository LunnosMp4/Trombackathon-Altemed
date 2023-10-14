import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'
import Papa from 'papaparse';
import 'leaflet/dist/leaflet.css';
import dataCsvPath from './datas/Residences.csv';
import MarkerClusterGroup from "react-leaflet-cluster";
import MarkerInfo from './markerInfo';
import { defaultMarker, activeMarker, redMarker, orangeMarker, yellowMarker, greenMarker } from './markerIcon';

delete L.Icon.Default.prototype._getIconUrl;

function LeafletMap() {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(dataCsvPath);

        if (response.ok) {
          const csvData = await response.text();

          Papa.parse(csvData, {
            header: true,
            delimiter: ',',
            complete: (result) => {

              const parsedMarkers = result.data.map((marker) => ({
                id: marker['Code Résidence ACM'],
                name: marker['Nom Résidence'],
                latitude: marker.Latitude,
                longitude: marker.Longitude,
                street: marker.Rue,
                zip: marker['Code postal'],
                city: marker.Ville,
                sector: marker.Secteur,
                constructionDate: marker['Date de Construction'],
                acquisitionDate: marker['Date d\'Acquisition'],
                renovationDate: marker['Prochaine Rénovation'],
                inf18: marker['<18'],
                from18to24: marker['18-24'],
                from25to49: marker['25-49'],
                from50to64: marker['50-64'],
                from65to74: marker['65-74'],
                sup75: marker['>=75'],
              }));

              setMarkers(parsedMarkers);
            }
          });
        } else {
          console.error('Error fetching CSV data. Response status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching or parsing CSV data:', error);
      }
    };

    fetchData();
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  return (
    <div>
    <MapContainer center={[43.6065089, 3.8917325]} zoom={13} minZoom={11} maxZoom={18} style={{ height: '100vh', width: '80%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

    {/* <MarkerClusterGroup> */}
      {markers.map((marker, index) => (
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
