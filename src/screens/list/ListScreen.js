import React, { useState, useEffect } from 'react';
import { Grid, FormControl, MenuItem, Select } from '@mui/material';
import './ListStyle.css';
import arrowBack from '../../icons/arrow_back.png';
import close from '../../icons/close.png';
import check from '../../icons/check.png';
import hourglass from '../../icons/hourglass.png';
import notifications from '../../icons/notifications.png';
import swap_vert from '../../icons/swap_vert.png';
import domain from "../../icons/domain.png";
import cancel_rounded from "../../icons/cancel_rounded.png";

const ListScreen = ({ residencesDatas, onBackToDashboard, onCardClick }) => {
  const formatText = (str) => {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  const [residences, setResidences] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedDropdownValue, setSelectedDropdownValue] = useState('all');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  }

  const handleCardClick = (residence) => {
    if (onCardClick)
      onCardClick(residence);
  };

  const handleCancelSearch = () => {
    setSearchQuery('');
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  }

  const handleDropdownChange = (event) => {
    setSelectedDropdownValue(event.target.value);
  }

  useEffect(() => {
    setResidences(residencesDatas);
  }, [residencesDatas]);

  // Filtrer les résidences en fonction de la recherche
  const filteredResidences = residences.filter(residence => {
    const search = searchQuery.toLowerCase();
    return (
      (residence.name && residence.name.toLowerCase().includes(search)) ||
      (residence.street && residence.street.toLowerCase().includes(search)) ||
      (residence.zip && residence.zip.includes(search)) ||
      (residence.city && residence.city.includes(search))
    );
  });


  // Trier la liste filtrée par residence.name
  const sortedResidences = [...filteredResidences].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  return (
    <div className="containerList">
      <div className="headerr">
        <div className="navbar">
          <img onClick={onBackToDashboard} className='icon-click' src={arrowBack}/>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Rechercher un nom, une adresse, un code postal..."
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            {searchQuery && (
              <img onClick={handleCancelSearch} className="icon" src={close} alt="User Avatar" />
            )}
            <img onClick={toggleSortOrder}className="icon" src={swap_vert} alt="Ascendant Descendant" />
          </div>
          <FormControl>
            <Select className='dropdown'
              value={selectedDropdownValue}
              onChange={handleDropdownChange}
            >
              <MenuItem value="Tous">Tous les secteurs</MenuItem>
              <MenuItem value="Secteur Gely">Secteur Gely</MenuItem>
              <MenuItem value="Secteur Astruc">Secteur Astruc</MenuItem>
              <MenuItem value="Secteur Rives du Lez">Secteur Rives du Lez</MenuItem>
              <MenuItem value="Secteur Pompignane">Secteur Pompignane</MenuItem>
              <MenuItem value="Secteur Lemasson">Secteur Lemasson</MenuItem>
              <MenuItem value="Secteur Beaux Arts">Secteur Beaux Arts</MenuItem>
              <MenuItem value="Secteur Pas du Loup">Secteur Pas du Loup</MenuItem>
              <MenuItem value="Secteur Jupiter">Secteur Jupiter</MenuItem>
              <MenuItem value="Secteur Vert Bois">Secteur Vert Bois</MenuItem>
              <MenuItem value="Secteur Uranus">Secteur Uranus</MenuItem>
              <MenuItem value="Secteur Gémeaux">Secteur Gémeaux</MenuItem>
              <MenuItem value="Secteur Cap dou Mail">Secteur Cap dou Mail</MenuItem>
              <MenuItem value="Secteur Paul Valery">Secteur Paul Valery</MenuItem>
              <MenuItem value="Secteur Agglomération">Secteur Agglomération</MenuItem>
              <MenuItem value="Secteur Gênes">Secteur Gênes</MenuItem>
              <MenuItem value="Secteur Aiguelongue">Secteur Aiguelongue</MenuItem>
              <MenuItem value="Secteur Croix d'argent">Secteur Croix d'argent</MenuItem>
              <MenuItem value="Secteur Près d'arènes">Secteur Près d'arènes</MenuItem>
              <MenuItem value="Secteur Lunel">Secteur Lunel</MenuItem>
              <MenuItem value="Secteur Val De Croze">Secteur Val De Croze</MenuItem>
              <MenuItem value="Secteur Tournezy">Secteur Tournezy</MenuItem>
              <MenuItem value="Secteur Millénaire">Secteur Millénaire</MenuItem>
              <MenuItem value="Secteur Celleneuve">Secteur Celleneuve</MenuItem>
              <MenuItem value="Secteur Gare">Secteur Gare</MenuItem>
              <MenuItem value="Secteur Antigone">Secteur Antigone</MenuItem>
              <MenuItem value="Secteur Le Damier">Secteur Le Damier</MenuItem>
              <MenuItem value="Secteur Bastide">Secteur Bastide</MenuItem>
              <MenuItem value="Secteur Belvedère">Secteur Belvedère</MenuItem>
              <MenuItem value="Secteur Grisettes">Secteur Grisettes</MenuItem>
              <MenuItem value="Secteur Malbosc">Secteur Malbosc</MenuItem>
              <MenuItem value="Secteur Las Rebes">Secteur Las Rebes</MenuItem>
              <MenuItem value="Secteur Port Marianne">Secteur Port Marianne</MenuItem>
              <MenuItem value="Secteur Ovalie">Secteur Ovalie</MenuItem>
              <MenuItem value="Secteur Villon">Secteur Villon</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className='chips-container'>
          <div className='chips-filter urgent'>
            <img className="icon-chips" src={notifications} alt="Alert" />
            <p>Urgents</p>
            <img className="icon-chips" src={cancel_rounded} alt="Cancel" />
          </div>
          <div className='chips-filter neutral-filter'>
            <p>Par odre alphabétiques</p>
            <img className="icon-chips" src={cancel_rounded} alt="Cancel" />
          </div>
          <div className='chips-filter neutral-filter'>
            <p>QPV</p>
          </div>
          <div className='chips-filter done'>
            <img className="icon-chips" src={check} alt="Alert" />
            <p>Facturés</p>
          </div>
          <div className='chips-filter in-progress'>
            <img className="icon-chips" src={hourglass} alt="Sector" />
            <p>Engagés</p>
          </div>
          <div className='chips-filter neutral-filter'>
            <p>Les plus récents</p>
          </div>
          <div className='chips-filter neutral-filter'>
            <p>...</p>
          </div>
        </div>
      </div>
      <Grid container className='list-card'>
          {sortedResidences.map(residence => (
            <div onClick={() => handleCardClick(residence)} className='residence-card'>
              <div className='chips-container'>
                <div className='chips urgent'>
                  <img className="icon-chips" src={notifications} alt="Alert" />
                  <p>5 incidents urgents</p>
                </div>
                <div className='chips neutral'>
                  <p>QPV</p>
                </div>
                <div className='chips sector'>
                  <img className="icon-chips" src={domain} alt="Sector" />
                  <p>{residence.sector}</p>
                </div>
              </div>
              <p className='residence-name'>{formatText(residence.name)}</p>
              <p className='residence-address'>{residence.street.toUpperCase()}</p>
            </div>
          ))}
      </Grid>
    </div>
  );
};

export default ListScreen;
