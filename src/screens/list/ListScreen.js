import React, { useState, useEffect } from 'react';
import { Grid, FormControl, MenuItem, Select } from '@mui/material';
import './style.css';
import arrowDropDown from '../../icons/arrow_drop_down.png';
import arrowDropLeft from '../../icons/arrow_left.png';
import arrowDropRight from '../../icons/arrow_right.png';
import cancel_rounded from '../../icons/cancel_rounded.png';
import close from '../../icons/close.png';
import check from '../../icons/check.png';
import hourglass from '../../icons/hourglass.png';
import notifications from '../../icons/notifications.png';
import swap_vert from '../../icons/swap_vert.png';
import domain from "../../icons/domain.png";

const ListScreen = ({ residencesDatas }) => {
  const formatText = (str) => {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [residences, setResidences] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedDropdownValue, setSelectedDropdownValue] = useState('all');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  }

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
    <div className="container">
      <div className="header">
        <div className="navbar">
          <img className="avatar" src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png" alt="User Avatar" />
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
              <MenuItem value="all">Tous les secteurs</MenuItem>
              <MenuItem value="rivedulez">Secteur Rive du Lez</MenuItem>
              <MenuItem value="aiguelongue">Secteur Aiguelongue</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className='chips-container'>
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
        </div>
      </div>
      <Grid container className=''>
          {sortedResidences.map(residence => (
            <div className='residence-card'>
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
