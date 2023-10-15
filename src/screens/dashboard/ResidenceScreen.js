import React from 'react';
import { Grid } from '@mui/material';

import '../../style/ResidenceScreen.css';
import IconAndText from './widgets/iconAndText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faTag, faTriangleExclamation, faTrowelBricks, faScrewdriverWrench, faEnvelope, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';

const ResidenceScreen = ({ residencesDatas, selectedResidence, followedResidences, setFollowedResidences }) => {

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

  return (
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
  );
};

export default ResidenceScreen;