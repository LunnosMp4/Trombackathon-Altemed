import React, { useState, useEffect } from 'react';
import { Grid, Paper, Avatar, CircularProgress, Typography, Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import BarChart from '../../components/BarChart';
import {Claims2019_2020, Claims2021_2022} from '../../constants/Data'

const DashboardScreen = ({
  residencesDatas,
  claimDatas19_20,
  claimDatas21_22,
  onListViewChange,
  onSectorChange
}) => {

  const [claims19_20, setClaims19_20] = useState({
    labels: Claims2019_2020.map((data) => data.month),
    datasets: [{
      label: "Total de Réclamations 2019/2020",
      data: Claims2019_2020.map((data) => data.claims),
      backgroundColor: ['blue'],
      borderColor: ['black'],
      borderWidth: 3
    }, {
      label: "Total de Réclamations 2021/2022",
      data: Claims2021_2022.map((data) => data.claims),
      backgroundColor: ['red'],
      borderColor: ['black'],
      borderWidth: 3
    }],
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
          <List sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
            <ListItem disablePadding sx={{ bgcolor: '#eeeeee', borderRadius: 10, height: 50, width: 200 }}>
              <ListItemButton onClick={onSectorChange} sx={{ borderRadius: 10 }}>
                <ListItemText primary="Secteur" component="a" href="#simple-list"/>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ bgcolor: '#eeeeee', borderRadius: 10, height: 50, width: 200 }}>
              <ListItemButton  sx={{ borderRadius: 10 }}>
                <ListItemText primary="Menu" component="b" href="#simple-list"/>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ bgcolor: '#eeeeee', borderRadius: 10, height: 50, width: 200 }}>
              <ListItemButton onClick={onListViewChange} sx={{ borderRadius: 10 }}>
                <ListItemText primary="Liste des incidents" component="b" href="#simple-list"/>
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
            <Grid item xs={12} sx={{ pt: 10 }}>
              <BarChart chartData={claims19_20} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardScreen;