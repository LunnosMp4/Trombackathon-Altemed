import React, { useState, useEffect } from 'react';
import { Grid, Paper, Avatar, CircularProgress, Typography, Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import BarChart from '../../components/BarChart';
import {UserData} from '../../constants/Data'

const DashboardScreen = ({
  residencesDatas,
  claimDatas19_20,
  claimDatas21_22,
  onListViewChange,
  onSectorChange
}) => {

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.month),
    datasets: [{
      label: "Réclamation en moyenne par mois",
      data: UserData.map((data) => data.claims),
    }]
  })

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
              <ListItemButton onClick={onSectorChange} sx={{ borderRadius: 10 }}>
                <ListItemText primary="Secteur" component="a" href="#simple-list"/>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ bgcolor: '#eeeeee', borderRadius: 10, height: 50, mr: 2 }}>
              <ListItemButton  sx={{ borderRadius: 10 }}>
                <ListItemText primary="Menu" component="b" href="#simple-list"/>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ bgcolor: '#eeeeee', borderRadius: 10, height: 50 }}>
              <ListItemButton onClick={onListViewChange} sx={{ borderRadius: 10 }}>
                <ListItemText primary="LISTVIEW" component="b" href="#simple-list"/>
              </ListItemButton>
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={10} sx={{ width: '100%', overflowY: 'auto'}}>
          <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='center'
            gap={5}
          >
            <Grid item xs={12}>
              <BarChart chartData={userData} />
              {/* <AverageResolutionTimeChart data={claimDatas19_20} /> */}
            </Grid>

            {/* {
              uniqueSectors.map((sector, index) => (
                <Grid item xs={3} key={index}>
                  <CircularProgressWithLabel
                    value={totalClaimsPerSector19_20[sector] || 0}
                    size={200}
                    sector={sector}
                  />
                </Grid>
              ))
            } */}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardScreen;