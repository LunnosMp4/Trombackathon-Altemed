import React, { useState, useEffect } from 'react';
import LeafletMap from './map/leafletMap';
import Papa from 'papaparse';
import { Grid, Paper,  } from '@mui/material';

import dataCsvPath from './datas/Résidences.csv'
import dataCsvPath2019_2020 from './datas/Réclamations_2019_2020.csv'
import dataCsvPath2021_2022 from './datas/Réclamations_2021_2022.csv'

import DashboardScreen from './screens/dashboard/DashboardScreen';
import ResidenceScreen from './screens/dashboard/ResidenceScreen';



function App() {
  const [residencesDatas, setResidencesDatas] = useState([]);
  const [claimDatas19_20, setClaimDatas19_20] = useState([]);
  const [claimDatas21_22, setClaimDatas21_22] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [followedResidences, setFollowedResidences] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(dataCsvPath);
        const response2 = await fetch(dataCsvPath2019_2020);
        const response3 = await fetch(dataCsvPath2021_2022);

        if (response.ok && response2.ok && response3.ok) {
          const csvData = await response.text();
          const csvData2 = await response2.text();
          const csvData3 = await response3.text();

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

              const parsedClaim19_20 = result.data.map((marker) => ({
                id: marker['Code Résidence ACM'],
                claimId: marker['Code Réclamation ACM'],
                category: marker[`Catégorie d'Affaire`],
                type: marker[`Type d'Affaire`],
                origin: marker[`Origine de l'Affaire`],
                agencyCode: marker[`Code Agence ACM`],
                year: marker[`Année`],
                month: marker[`Mois`],
                commitment: marker[`Engagement(Réparations)`],
                resolutionTime: marker[`Délai de Résolution`],
              }));

              const parsedClaim21_22 = result.data.map((marker) => ({
                id: marker['Code Résidence ACM'],
                claimId: marker['Code Réclamation ACM'],
                category: marker[`Catégorie d'Affaire`],
                type: marker[`Type d'Affaire`],
                origin: marker[`Origine de l'Affaire`],
                agencyCode: marker[`Code Agence ACM`],
                year: marker[`Année`],
                month: marker[`Mois`],
                commitment: marker[`Engagement(Réparations)`],
                resolutionTime: marker[`Délai de Résolution`],
              }));

              setResidencesDatas(parsedResidences);
              setClaimDatas19_20(parsedClaim19_20);
              setClaimDatas21_22(parsedClaim21_22);
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
            <ResidenceScreen
              residencesDatas={residencesDatas}
              selectedResidence={selectedMarker}
              followedResidences={followedResidences}
              setFollowedResidences={setFollowedResidences}
            />
          ) : (
            <DashboardScreen
              residencesDatas={residencesDatas}
              claimDatas19_20={claimDatas19_20}
              claimDatas21_22={claimDatas21_22}
            />
          )}
        </Grid>

        <Grid item xs={4} sx={{ bgcolor: '#eeeeee', height: '90vh', borderRadius: 10, overflow: 'hidden' }}>
          <Paper >
            <LeafletMap residencesDatas={residencesDatas} onMarkerClick={handleMarkerClick} followedResidences={followedResidences} />
          </Paper>
        </Grid>

      </Grid>
    </div>
    </div>
  );
}

export default App;
