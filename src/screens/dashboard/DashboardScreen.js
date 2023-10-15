import React, { useState, useEffect } from 'react';
import LeafletMap from '../../map/leafletMap';
import Papa from 'papaparse';
import PropTypes from 'prop-types';
import { Grid, Paper, Avatar, CircularProgress, Typography, Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

function CircularProgressWithLabel(props) {

  const getColorFromValue = (value) => {
    if(value < 25) {
      return 'green';
    } else if(value >= 25 && value < 50) {
      return 'yellow';
    } else if(value >= 50 && value < 75) {
      return 'orange';
    } else if(value >= 75) {
      return 'red';
    } else {
      return 'grey';  // Optional: default color if value is out of expected range
    }
  };

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        {...props}
        sx={{
          color: getColorFromValue(props.value), // Use function to get color
          '& .MuiCircularProgress-determinate': {
            color: getColorFromValue(props.value),
          },
          '& .MuiCircularProgress-track': {
            opacity: 0.3,  // or another value you prefer
            color: getColorFromValue(props.value),
          }
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          sx={{ whiteSpace: 'pre-line' }}
        >
          {`${props.sector} \n`}
          {`${Math.round(props.value)} Réclamations`}
        </Typography>
      </Box>
    </Box>
  );
}


CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

const calculateClaimsPerSector = (claimsData, residencesData) => {
  const totalClaimsPerSector = {};

  claimsData.forEach(claim => {
    const residence = residencesData.find(res => res.id === claim.id);
    const sector = residence ? residence.sector : undefined;

    if(sector) {
      totalClaimsPerSector[sector] = (totalClaimsPerSector[sector] || 0) + 1;
    }
  });

  return totalClaimsPerSector;
};



const DashboardScreen = ({ residencesDatas, claimDatas19_20, claimDatas21_22 }) => {

  const totalClaimsPerSector19_20 = calculateClaimsPerSector(claimDatas19_20, residencesDatas);
  const totalClaimsPerSector21_22 = calculateClaimsPerSector(claimDatas21_22, residencesDatas);

  const uniqueSectors = Array.from(new Set(residencesDatas.map(r => r.sector)));

  return (
    <div>
      <Grid
        container
        direction='column'
        pt={5}
        alignItems='center'
        sx={{ height: '95vh', bgcolor: '#fff', borderRadius: 10, overflow: 'hidden' }}
      >

        <Grid item xs={1} sx={{ bgcolor: '#fff' }}>
          <List sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <ListItem disablePadding sx={{ bgcolor: '#eeeeee', borderRadius: 10, height: 50, mr: 2 }}>
              <ListItemButton sx={{ borderRadius: 10 }}>
                <ListItemText primary="Secteur" component="a" href="#simple-list"/>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ bgcolor: '#eeeeee', borderRadius: 10, height: 50 }}>
              <ListItemButton sx={{ borderRadius: 10 }}>
                <ListItemText primary="Urgence" component="b" href="#simple-list"/>
              </ListItemButton>
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={1} sx={{ bgcolor: '#eeeeee' }}>
        </Grid>

        <Grid item xs={10} sx={{ bgcolor: '#fff', width: '100%', overflowY: 'auto'}}>
          <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='center'
            gap={5}
          >
            {
              uniqueSectors.map((sector, index) => (
                <Grid item xs={3} key={index}>
                  <CircularProgressWithLabel
                    value={totalClaimsPerSector19_20[sector] || 0}
                    size={200}
                    sector={sector}
                  />
                </Grid>
              ))
            }
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardScreen;