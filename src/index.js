import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Avatars from './Avatars';
import DrodownMenu from './components/DropownMenu'
import {wc2022ResultsURL, wc2022PredictionDataURL, wc2022MatchStages} from "./games/football-wc/wc2022"
import {wc2018ResultsURL, wc2018PredictionDataURL, wc2018MatchStages} from "./games/football-wc/wc2018"
import {euro2020ResultsURL, euro2020PredictionDataURL, euro2020MatchStages} from "./games/euro/euro2020"
import reportWebVitals from './reportWebVitals';


const games = ["World Cup 2018", "Euro Cup 2020", "World Cup 2022"]
const tName = "World Cup 2022";
var resultsURL = null;
var predictionDataURL = null;
var matchStages = [];
if (!"World Cup 2018".localeCompare(tName)) {
  resultsURL = wc2018ResultsURL;
  predictionDataURL = wc2018PredictionDataURL;
  matchStages = wc2018MatchStages;
} else if (!"World Cup 2022".localeCompare(tName)) {
  resultsURL = wc2022ResultsURL;
  predictionDataURL = wc2022PredictionDataURL;
  matchStages = wc2022MatchStages;
} else if (!"Euro Cup 2020".localeCompare(tName)) {
  resultsURL = euro2020ResultsURL;
  predictionDataURL = euro2020PredictionDataURL;
  matchStages = euro2020MatchStages;
}

const dropdown = ReactDOM.createRoot(document.getElementById('games-menu'));
dropdown.render(
  <React.StrictMode>
    <DrodownMenu 
      allGames={games}
    />
  </React.StrictMode>
);

//based on what user clicks initalize the right CSV variables 
//these variables are defined under /js/games/*.js
const app = ReactDOM.createRoot(document.getElementById('leaderboards'));
app.render(
  <React.StrictMode>
    <App 
      tournamentName={tName} 
      resultsURL={resultsURL} 
      predictionURL={predictionDataURL} 
      matchStages={matchStages}
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
