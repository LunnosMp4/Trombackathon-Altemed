import React from 'react';
import { Grid } from '@mui/material';

import '../../style/ResidenceScreen.css';
import IconAndText from './widgets/iconAndText';
import Complaints from './widgets/complaints';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faTag, faTriangleExclamation, faTrowelBricks, faScrewdriverWrench, faEnvelope, faEnvelopeOpen, faPeopleGroup, faBell } from '@fortawesome/free-solid-svg-icons';

const ResidenceScreen = ({ selectedResidence, followedResidences, setFollowedResidences, onBackToDashboard, claimDatas21_22 }) => {
  const filteredComplaints = claimDatas21_22.filter((claim) => {
    const id = claim.id.replace(/^0+/, '');
    return id === selectedResidence.id;
  });

  const typeCounts = filteredComplaints.reduce((counts, claim) => {
    const type = claim.type;
    counts[type] = (counts[type] || 0) + 1;
    return counts;
  }, {});

  let importance3Count = 0;

  const calculateImportance = (type, resolutionTime) => {
    // Define the importance priority order
    const importanceOrder = {
      'Sécurité': 3, 'Santé / Hygiène': 3, 'Désinsec/Dérat/Désinfect': 3, 'Infiltration Etanchéité': 3,
      'Eau Usée vanne pluviale': 3, 'Electricité': 3, 'Ascenseur': 3, 'Interphone/Portail': 3, 'Impayés': 3,
      'Troubles de voisinage': 2, 'Facturation et Régul': 2, 'Gestion Clientèle': 2, 'Plomberie': 2,
      'Demande RDV Internet': 2, 'Télévision': 2, 'Serrurerie': 2, 'Cadre de vie': 2, 'Espaces Verts': 2,
      'Menuiserie': 1, 'Peinture': 1, 'Maçonnerie': 1, 'Nettoyage': 1, 'Fournitures/Location': 1,
      'VMC': 1, 'Déménagement': 1, 'Epaves': 1, 'Câble': 1, 'Reprise DI': 1, 'Demande Diagnostic TEST': 1,
    };

    const importanceLevel = importanceOrder[type] || 0;

    if (resolutionTime > 60) {
      return Math.max(importanceLevel, 3);
    }

    if (resolutionTime > 30) {
      return Math.min(importanceLevel + 1, 3);
    }

    return importanceLevel;
  };

  //count the number of importance 3 and stock it in importance3Count
  Object.keys(typeCounts).forEach((type) => {
    const importance = calculateImportance(type, 30);
    if (importance === 3) {
      importance3Count += typeCounts[type];
    }
  });

  const complaintArray = Object.keys(typeCounts).map((type) => ({
    type,
    count: typeCounts[type],
    importance: calculateImportance(type, 30),
  }));

  complaintArray.sort((a, b) => b.importance - a.importance);

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
      <h2 class="backName">Dashboard</h2>
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
              <IconAndText icon={faBell} text={`Incidents en urgence : ${importance3Count}`} />
          </Grid> 
        </Grid>
        <Grid item xs={12} >
           <div className='complaints'>
              <h2 style={{marginLeft: '40px'}}>Toutes les plaintes</h2>
              <ul>
                {complaintArray.map((complaint, index) => (
                  <Complaints key={index} type={complaint.type} count={complaint.count} importance={complaint.importance} />
                ))}
              </ul>
            </div>
        </Grid>
      </Grid>
    </div>
    </div>
  );
};

export default ResidenceScreen;
