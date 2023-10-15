import React from 'react';
import { Grid } from '@mui/material';

import '../../style/ResidenceScreen.css';
import IconAndText from './widgets/iconAndText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faTag, faTriangleExclamation, faTrowelBricks, faScrewdriverWrench, faEnvelope, faEnvelopeOpen, faPeopleGroup, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

const ResidenceScreen = ({ selectedResidence, followedResidences, setFollowedResidences, onBackToDashboard, claimDatas21_22 }) => {

  const formatText = (str) => {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  const formatDate = (date) => {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);
    return `${day}/${month}/${year}`;
  }

  const handleFollowClick = (residenceId) => {
    if (followedResidences.includes(residenceId)) {
      const updatedList = followedResidences.filter((id) => id !== residenceId);
      setFollowedResidences(updatedList);
    } else {
      setFollowedResidences([...followedResidences, residenceId]);
    }
  }

  const getAllResidents = (residence) => {
    const inf18 = parseInt(residence.inf18, 10) || 0;
    const from18to24 = parseInt(residence.from18to24, 10) || 0;
    const from25to49 = parseInt(residence.from25to49, 10) || 0;
    const from50to64 = parseInt(residence.from50to64, 10) || 0;
    const from65to74 = parseInt(residence.from65to74, 10) || 0;
    const sup75 = parseInt(residence.sup75, 10) || 0;
  
    return inf18 + from18to24 + from25to49 + from50to64 + from65to74 + sup75;
  }

  return (
    <div>
    <div className='backButton' onClick={onBackToDashboard}>
      <img className='backIcon' src={require('../../icons/arrow_back.png')}/>
      <h2 class="backName">Retour</h2>
    </div>
    <div className='start'>
      <Grid container sx={{ bgcolor: '#eeeeee', borderRadius: 10}}>
        <Grid container sx={{ paddingBottom: '30px' }}>
          <Grid item xs={4} className="left-side"></Grid>
          <Grid item xs={8} className="right-side">
              <div className='header'>
                <h1>{formatText(selectedResidence.name)}</h1>
                <button
                  className='followButton'
                  onClick={() => {
                    const residenceId = selectedResidence.id;
                    handleFollowClick(residenceId);
                  }}
                >
                  <p>{followedResidences.includes(selectedResidence.id) ? 'Suivi' : 'Suivre'}</p>
                  <FontAwesomeIcon className="followIcon" icon={followedResidences.includes(selectedResidence.id) ? faEnvelope : faEnvelopeOpen} />
                </button>
              </div>
              <h2>{formatText(selectedResidence.street)}</h2>
              <h3>{selectedResidence.zip} {formatText(selectedResidence.city)}</h3>
              <IconAndText icon={faBuilding} text={selectedResidence.sector}/>
              <IconAndText icon={faTag} text={`Code ACM n°${selectedResidence.id}`} />
              <IconAndText icon={faTriangleExclamation} text={selectedResidence.sensibleZone === 'Hors QPV' ? 'Zone Non Sensible' : 'Zone Sensible'} />
              <IconAndText icon={faTrowelBricks} text={`Date de construction : ${formatDate(selectedResidence.constructionDate)}`} />
              <IconAndText icon={faScrewdriverWrench} text={`Date de renovation : ${formatDate(selectedResidence.renovationDate)}`} />
              <IconAndText icon={faPeopleGroup} text={`Nombre de Résident : ${getAllResidents(selectedResidence)}`} />
          </Grid> 
        </Grid>
        <Grid item xs={12} >
          <p>b</p>
          <p>o</p>
          <p>n</p>
          <p>j</p>
          <p>o</p>
          <p>u</p>
          <p>r</p>
        </Grid>
      </Grid>
    </div>
    </div>
  );
};

export default ResidenceScreen;