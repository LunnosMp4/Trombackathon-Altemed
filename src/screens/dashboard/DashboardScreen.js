import React, { useState, useEffect } from 'react';
import LeafletMap from '../../map/leafletMap';
import Papa from 'papaparse';
import { Grid, Paper,  } from '@mui/material';

const DashboardScreen = ({ residencesDatas }) => {

  return (
    <div>
      <Grid container sx={{ bgcolor: '#eeeeee', height: '90vh', borderRadius: 10 }}>
        <Grid item xs={12}>
          {/* <LeafletMap residencesDatas={residencesDatas} /> */}
        </Grid>
        <Grid item xs={12}>
          {/* <LeafletMap residencesDatas={residencesDatas} /> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardScreen;