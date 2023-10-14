import React, { useState, useEffect } from 'react';
import LeafletMap from './map/leafletMap';
import Papa from 'papaparse';

import dataCsvPath from './datas/Residences.csv'

function App() {
  const [residencesDatas, setResidencesDatas] = useState([]);

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

  return (
    <div className="App">
      <LeafletMap residencesDatas={residencesDatas} />
    </div>
  );
}

export default App;
