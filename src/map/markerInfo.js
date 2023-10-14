function MarkerInfo({ selectedMarker }) {
    return (
      <div className="marker-info">
        {selectedMarker && (
          <div>
            <h3>{selectedMarker.name}</h3>
            <p>Latitude: {selectedMarker.latitude}</p>
            <p>Longitude: {selectedMarker.longitude}</p>
            <p>Rue: {selectedMarker.street}</p>
            <p>Code Postal: {selectedMarker.zip}</p>
            <p>Ville: {selectedMarker.city}</p>
            <p>Secteur: {selectedMarker.sector}</p>
            <p>Date de Construction: {selectedMarker.constructionDate}</p>
            <p>Date d'acquisition: {selectedMarker.acquisitionDate}</p>
            <p>Prochaine Rénovation: {selectedMarker.renovationDate}</p>
            <p>Moins de 18 ans: {selectedMarker.inf18}</p>
            <p>18-24 ans: {selectedMarker.from18to24}</p>
            <p>25-49 ans: {selectedMarker.from25to49}</p>
            <p>50-64 ans: {selectedMarker.from50to64}</p>
            <p>65-74 ans: {selectedMarker.from65to74}</p>
            <p>Plus de 75 ans: {selectedMarker.sup75}</p>
          </div>
        )}
      </div>
    );
  }
  
  export default MarkerInfo;