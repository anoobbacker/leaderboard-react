import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Avatars from './Avatars';
import Intro from './Intro'
import { Tournaments } from './components/TournamentContext';
import reportWebVitals from './reportWebVitals';

const tournament = Tournaments.WorldCup2022;

const intro = ReactDOM.createRoot(document.getElementById('games-menu'));
intro.render(
  <React.StrictMode>
    <Intro />
  </React.StrictMode>
);

//based on what user clicks initalize the right CSV variables 
//these variables are defined under /js/games/*.js
const app = ReactDOM.createRoot(document.getElementById('leaderboards'));
app.render(
  <React.StrictMode>
    <App 
      tournamentName={tournament.name} 
      resultsURL={tournament.resultsURL} 
      predictionURL={tournament.predictionURL} 
      matchStages={tournament.matchStages}
    />
  </React.StrictMode>
);

const avatars = ReactDOM.createRoot(document.getElementById('avatars'));
avatars.render(
  <React.StrictMode>
    <Avatars />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
