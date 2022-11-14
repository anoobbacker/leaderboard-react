import React from 'react';
import {wc2022ResultsURL, wc2022PredictionDataURL, wc2022MatchStages} from "../games/football-wc/wc2022"
import {wc2018ResultsURL, wc2018PredictionDataURL, wc2018MatchStages} from "../games/football-wc/wc2018"
import {euro2020ResultsURL, euro2020PredictionDataURL, euro2020MatchStages} from "../games/euro/euro2020"

export const Tournaments = {
    WorldCup2018: {
        name: "World Cup 2018",
        resultsURL: wc2018ResultsURL,
        predictionURL: wc2018PredictionDataURL,
        matchStages: wc2018MatchStages,
    },
    EuroCup2020: {
        name: "Euro Cup 2020",
        resultsURL: euro2020ResultsURL,
        predictionURL: euro2020PredictionDataURL,
        matchStages: euro2020MatchStages,
    },
    WorldCup2022: {
        name: "World Cup 2022",
        resultsURL: wc2022ResultsURL,
        predictionURL: wc2022PredictionDataURL,
        matchStages: wc2022MatchStages,
    }
}

// Make sure the shape of the default value passed to
// createContext matches the shape that the consumers expect!
export const TournamentContext = React.createContext({
    tournament:Tournaments.WorldCup2022,
    switchTournament: (e) => {},
});