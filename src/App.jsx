import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import { auth, database } from './firebase/firebase-config';
import { onAuthStateChanged } from "firebase/auth";

import Routing from './Routing';
import axios from 'axios';
import Header from './components/Header/header.jsx';
import Carouselpage from './components/carousel/carousel';
import MineSweeper from './components/Games/MineSweeper.jsx';

// import Search from 'components/Search';
// import Details from 'components/DetailsView/Details';
// import GridContainer from 'components/GridView/GridContainer';
// import List from 'components/ListView/PokemonList';
import PropTypes from 'prop-types';

function App(props) {

  App.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    setSortBy: PropTypes.func.isRequired,
    setTypeFilter: PropTypes.func.isRequired,
  };

  return (
    <div className="App">
      <Routing />
    </div>
  );
}

export default App;
