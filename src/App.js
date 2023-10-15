import React, { useState, useEffect } from 'react';
import LeafletMap from './map/leafletMap';
import Papa from 'papaparse';
import { Grid, Paper,  } from '@mui/material';

import dataCsvPath from './datas/Résidences.csv'
import dataCsvPath2019_2020 from './datas/Réclamations_2019_2020.csv'
import dataCsvPath2021_2022 from './datas/Réclamations_2021_2022.csv'

import DashboardScreen from './screens/dashboard/DashboardScreen';
import ResidenceScreen from './screens/dashboard/ResidenceScreen';
import ListScreen from './screens/list/ListScreen';
import SectorScreen from './screens/dashboard/SectorScreen';


function App() {
  const [residencesDatas, setResidencesDatas] = useState([]);
  const [claimDatas19_20, setClaimDatas19_20] = useState([]);
  const [claimDatas21_22, setClaimDatas21_22] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [followedResidences, setFollowedResidences] = useState([]);
  const [showListView, setShowListView] = useState(false);
  const [showSectorView, setShowSectorView] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(dataCsvPath);
        const response2 = await fetch(dataCsvPath2019_2020);
        const response3 = await fetch(dataCsvPath2021_2022);

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

        if (response2.ok) {
          const csvData2 = await response2.text();

          Papa.parse(csvData2, {
            header: true,
            delimiter: ',',
            complete: (result) => {

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

              setClaimDatas19_20(parsedClaim19_20);
            }
          });
        } else {
          console.error('Error fetching CSV data. Response status:', response.status);
        }
        if (response3.ok) {
          const csvData3 = await response3.text();

          Papa.parse(csvData3, {
            header: true,
            delimiter: ',',
            complete: (result) => {

              const parsedClaim21_22 = result.data.map((marker) => ({
                id: marker['Code Résidence ACM'],
                claimId: marker['Code Réclamation ACM'],
                category: marker['Catégorie d\'Affaire'],
                type: marker['Type d\'Affaire'],
                origin: marker['Origine de l\'Affaire'],
                agencyCode: marker['Code Agence ACM'],
                year: marker['Année'],
                month: marker['Mois'],
                commitment: marker[`Engagement(Réparations)`],
                resolutionTime: marker[`Délai de résolution en Jours`],
              }));

              console.log(parsedClaim21_22)

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

  const handleBackToDashboard = () => {
    setSelectedMarker(null);
    setShowListView(false);
    setShowSectorView(false);
  };

  const handleHideListView = () => {
    setShowListView(false);
  };

  const handleShowListView = () => {
    setShowListView(true);
  };

  const handleShowSectorView = () => {
    setShowSectorView(true);
  }

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
            onBackToDashboard={handleBackToDashboard}
            claimDatas21_22={claimDatas21_22}
          />
        ) : showListView ? (
          <ListScreen
            residencesDatas={residencesDatas}
            onBackToDashboard={handleHideListView}
            onCardClick={handleMarkerClick}
          />
        ) : showSectorView ? (
          <SectorScreen
            residencesDatas={residencesDatas}
            claimDatas19_20={claimDatas19_20}
            claimDatas21_22={claimDatas21_22}
            onDashboardChange={handleBackToDashboard}
            onListViewChange={handleShowListView}
          />
        ) : (
          <DashboardScreen
            residencesDatas={residencesDatas}
            claimDatas19_20={claimDatas19_20}
            claimDatas21_22={claimDatas21_22}
            onListViewChange={handleShowListView}
            onSectorChange={handleShowSectorView}
          />
        )}
        </Grid>

        <Grid item xs={4} sx={{ bgcolor: '#eeeeee', height: '90vh', borderRadius: 10, overflow: 'hidden' }}>
          <Paper>
            <LeafletMap residencesDatas={residencesDatas} onMarkerClick={handleMarkerClick} followedResidences={followedResidences} />
          </Paper>
        </Grid>

      </Grid>
    </div>
    </div>
  );
}

export default App;
