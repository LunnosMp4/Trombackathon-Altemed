import React from 'react';
import { Grid } from '@mui/material';

import '../../style/ResidenceScreen.css';
import IconAndText from './widgets/iconAndText';
import { faBuilding, faTag, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const ResidenceScreen = ({ residencesDatas, selectedResidence }) => {

  const formatText = (str) => {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  return (
    <div className='start'>
      <Grid container sx={{ bgcolor: '#eeeeee', borderRadius: 10}}>
        <Grid container sx={{ paddingBottom: '30px' }}>
          <Grid item xs={4} className="left-side">
          </Grid>
          <Grid item xs={8} className="right-side">
            <h1>{formatText(selectedResidence.name)}</h1>
            <h2>{formatText(selectedResidence.street)}</h2>
            <h3>{selectedResidence.zip} {formatText(selectedResidence.city)}</h3>
            <IconAndText icon={faBuilding} text={selectedResidence.sector}/>
            <IconAndText icon={faTag} text={`Code ACM n°${selectedResidence.id}`} />
            <IconAndText icon={faTriangleExclamation} text={selectedResidence.sensibleZone === 'Hors QPV' ? 'Zone Non Sensible' : 'Zone Sensible'} />
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