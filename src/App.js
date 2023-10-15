import React, { useState, useEffect } from 'react';
import LeafletMap from './map/leafletMap';
import Papa from 'papaparse';
import { Grid, Paper,  } from '@mui/material';

import dataCsvPath from './datas/Résidences.csv'
import Dashboard from './screens/dashboard/DashboardScreen';
import DashboardScreen from './screens/dashboard/DashboardScreen';
import ResidenceScreen from './screens/dashboard/ResidenceScreen';



function App() {
  const [residencesDatas, setResidencesDatas] = useState([]);
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

              const parsedResidences = result.data.map((marker) => ({
                id: marker['Code Résidence ACM'],
                name: marker['Nom Résidence'],
                latitude: marker.Latitude,
                longitude: marker.Longitude,
                street: marker.Rue,
                zip: marker['Code postal'],
                city: marker.Ville,
                sector: marker.Secteur,
                sensibleZone: marker['Zone_Sensible'],
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

              setResidencesDatas(parsedResidences);
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
    <div className="App">
      <div>
      <Grid
        container
        gap={10}
        direction='row'
        justifyContent='center'
        alignItems='center'
        sx={{ bgcolor: '#fff', height: '100vh' }}
      >
        <Grid item xs={7}>
          {selectedMarker ? (
            <ResidenceScreen residencesDatas={residencesDatas} selectedResidence={selectedMarker} />
          ) : (
            <DashboardScreen residencesDatas={residencesDatas} />
          )}
        </Grid>

        <Grid item xs={4} sx={{ bgcolor: '#eeeeee', height: '90vh', borderRadius: 10, overflow: 'hidden' }}>
          <Paper >
            <LeafletMap residencesDatas={residencesDatas} onMarkerClick={handleMarkerClick} />
          </Paper>
        </Grid>

      </Grid>
    </div>
    </div>
  );
}

export default App;
