import Papa from "papaparse"
import {wc2022ResultsURL, wc2022PredictionDataURL, wc2022MatchStages} from "./wc2022"
import {teamFlag, teamNameAcronymn } from '../../const/teamNameAndFlag'

var csvMatchResults = null;
var csvPredictionResults = null;
var resultsURL = null;
var predictionDataURL = null;
var csvMatchStages = null;

export function loadTournamentDataFromCSV(tournamentName) {
    resultsURL = null;
    predictionDataURL = null;
    csvMatchStages = null;
    csvMatchResults = null;
    csvPredictionResults = null;

  
    //based on what user clicks initalize the right CSV variables 
    //these variables are defined under /js/games/*.js
    if (!"World Cup 2022".localeCompare(tournamentName)) {
      resultsURL = wc2022ResultsURL;
      predictionDataURL = wc2022PredictionDataURL;
      csvMatchStages = wc2022MatchStages;
    }
    
    //parse the CSV file for match results completeResultsFn 
    // is executed after parse is complete
    var rConfig = buildResultsConfig();
  
    //results will be returned asynchornously
    //refer https://www.papaparse.com/docs#remote-files
    Papa.parse(
      resultsURL,
      rConfig);
    if (rConfig.worker || rConfig.download) {
      //console.log("Results parsing running...");
    }
}

//function that is called after parsing prediction csv file and starts 
//trigger parsing prediction csv file
function completeResultsFn(results) {
    if (results && results.errors) {
      if (results.errors) {
        //TODO: Report errors
      }
      if (results.data && results.data.length > 0) {
        csvMatchResults = results.data;
      }
    }
  
    //console.log("    Match Results:", results);
  
    //afte processing results CSV. Parse prediction CSV
    //completePredictFn is called after all files are complete
    var pConfig = buildPredictConfig();
    Papa.parse(
      predictionDataURL,
      pConfig);
    if (pConfig.worker || pConfig.download) {
      //console.log("Prediction parsing running...");
    }
}

function completePredictFn(results) {
    if (results && results.errors) {
      if (results.errors) {
        //TODO: Report error
      }
    }
  
    //console.log("    Predict Results:", results);
    if (!csvMatchResults) {
      console.log("    Match Results not loaded!");
      return;
    }

    if (results.data && results.data.length > 0) {
        csvPredictionResults = results;
    }

    processCSVData(csvMatchResults, csvPredictionResults, csvMatchStages);
}

export function processCSVData(matchResults, predictionResults, matchStages)
{
    var leaderboard = {};
    var leaderboardPredictScorePlusWinnerGameCount = {};
    var leaderboardPredictWinnerGameCount = {};
    var leaderboardPredictLossesGameCount = {};
    var leaderboardPredictMatchesScorePlusWinner = {};
    var leaderboardPredictMatchesWinner = {};
    var leaderboardPredictMatchesLost = {};
    var predictParticipationTrack = {};
    var leaderboardTotalPredicts = {};
    var allPredictions = [];
    var upcomingPredictions = [];
    var leaderboardCatalog = [];
    var keyOptions = [];

  
    //iterate through the matchStages defined under /js/games/*.js
    //and initalize the keyOptions
    matchStages.forEach((value, index, array) => {
        if (keyOptions.length == 0) {
          keyOptions.push("Participant"); //index 0
          keyOptions.push("Total points"); //index 1
          keyOptions.push("Total score predict matches"); //index 2
          keyOptions.push("Total winner predict matches"); //index 3
          keyOptions.push("Total predict lost matches"); //index 4
          keyOptions.push("Total number of matches"); //index 5
        }
    
        //add these to every stages in the matchStages
        keyOptions.push(value['Desc'] + " points");
        keyOptions.push(value['Desc'] + " score predict matches");
        keyOptions.push(value['Desc'] + " winner predict matches");
        keyOptions.push(value['Desc'] + " predict lost matches");    
      })    
  
    //find the active stage rounds of the matches
    //stage number starts from 1, after processing if 
    //activeStageMatchNumber is zero that means all the matches
    //are completed.
    var activeStageMatchNumber = 0;
    var activeStageYetToStart = false;
    var activeStageYetToEnd = false;
    var tournamentStillOn = false;
    var today = new Date();
    for (var i = 0; i < matchStages.length; i++) {
      var dDiff = Date.parse(matchStages[i].StageEndDate) - today;
      var diffDays = Math.ceil(dDiff / (1000 * 3600 * 24));
      //console.log("Today",today, "stage end date", matchStages[i].StageEndDate, "Diff days", diffDays);
      //if diffDays is -ve that means match was completed.
      //if diffDays is zero or +ve that means match is yet to happen.
      if (diffDays >= 0) {
        activeStageMatchNumber = matchStages[i].MatchNumber;
        break;
      }
    }
  
    //set flag to indicate if tournament is still running.
    if (activeStageMatchNumber != 0) {
      tournamentStillOn = true;
      
      var activeStageStartDate = Date.parse(matchStages[activeStageMatchNumber].StageStartDate);
      var activeStageEndDate = Date.parse(matchStages[activeStageMatchNumber].StageEndDate);
      if (today < activeStageStartDate) {
        activeStageYetToStart = true;
      }
  
      if (today <= activeStageEndDate){
        activeStageYetToEnd = true;
      }
    }
  
    var lastMatchNo = 0;
    var newMatch = false;
    var isUpcoming = false;
    var upComingMatchCount = 0;
    //Check if prediction has (1) Game #, (2) TeamA, 
    //(3) TeamB, (4) Name, (5) TeamAScore, (6) TeamBScore
    var predictionRowColumnCount = 6;
  
    //By default people participation is 6 folks.
     for (var ii = predictionResults.length - 1; ii >= 0; ii--) {
      var otherRow = predictionResults[ii];
  
      //Check if prediction row has correct column count.
      if (otherRow.length != predictionRowColumnCount) {
        continue;
      }
  
      var currentMatchNo = otherRow[0];
      //predictParticipationTrack[currentMatchNo] tracks the # of predictions
      if (isNaN(predictParticipationTrack[currentMatchNo])) {
        predictParticipationTrack[currentMatchNo] = 1;
      } else {
        predictParticipationTrack[currentMatchNo]++;
      }
    }
  
    for (var i = predictionResults.length - 1; i > 0; i--) {
      var row = predictionResults[i];
  
      //Check if prediction row has correct column count.
      if (row.length != predictionRowColumnCount) {
        continue;
      }
      //set new match flag. new match flag this is used to ensure that match name
      //is displayed once in the row where as participants names are shown seperatly
      currentMatchNo = row[0];
      if (lastMatchNo != currentMatchNo) {
        newMatch = true;
        isUpcoming = false;
      } else {
        newMatch = false;
      }
      lastMatchNo = currentMatchNo;
        
      //set the current match stage by reading stages defined in js/games/*.js
      //set default currentMatchStage to last match stage to ensure that if we
      //don't match the if-condition inside for loop, it means last stage.
      var currentMatchStage = matchStages.length - 1;
      for (var x = 0; x < matchStages.length; x++) {
        if (currentMatchNo < matchStages[x].MatchNumber) {
          currentMatchStage = matchStages[x].Stage - 1;
          break;
        }
      }
  
      //name
      var participantName = row[3].trim();
      if (!"".localeCompare(participantName)) {
        continue;
      }
  
      //actual result
      var matchResultEval = allPredictions[currentMatchNo]?.match;
      var matchResult = matchResults[currentMatchNo];
  
      var matchResultTeamAName = (matchResult[1] == "") ? "TBD" : matchResult[1];
      var matchResultTeamBName = (matchResult[2] == "") ? "TBD" : matchResult[2];
  
      var predictTeamAName = teamNameAcronymn[matchResultTeamAName];
      var predictTeamBName = teamNameAcronymn[matchResultTeamBName];
  
      //add match name
      //new match flag this is used to ensure that match name
      //is displayed once in the row
      if (newMatch) {
        var matchResultTeamAScore = matchResult[4];
        var matchResultTeamBScore = matchResult[5];
        var matchResultStatus = matchResult[3];
        var matchComplete = false;
        if ("Complete".localeCompare(matchResultStatus) == 0) {
          if (matchResultTeamAScore > matchResultTeamBScore) {
            matchResultEval = {
                teamA: {name: predictTeamAName, score: matchResultTeamAScore, result: 'win'},
                teamB: {name: predictTeamBName, score: matchResultTeamBScore, result: 'lost'},
                result: 'A-win'
            }
          } else if (matchResultTeamAScore < matchResultTeamBScore) {
            matchResultEval = {
                teamA: {name: predictTeamAName, score: matchResultTeamAScore, result: 'lost'},
                teamB: {name: predictTeamBName, score: matchResultTeamBScore, result: 'win'},
                result: 'B-win'
            }          
          } else {
            matchResultEval = {
                teamA: {name: predictTeamAName, score: matchResultTeamAScore, result: 'draw'},
                teamB: {name: predictTeamBName, score: matchResultTeamBScore, result: 'draw'},
                result: 'draw'
            }            
          }
          matchComplete = true;
          if (!"True".localeCompare(matchStages[currentMatchStage].IsFinal)) {
            tournamentStillOn = false;
          }
        } else {
          var matchDateDiff = Math.abs(Date.parse(matchResultStatus.trim()) - new Date());
          var diffDays = Math.ceil(matchDateDiff / (1000 * 3600 * 24));
          //if the match is going to happen in the next x days 
          //show that in upcoming section.
          if (diffDays <= 2) {
            isUpcoming = true;
            upComingMatchCount++;
          } else if ( (currentMatchStage == activeStageMatchNumber) 
                && ((activeStageYetToStart == true) 
                || (activeStageYetToEnd == true))
            ) {
            isUpcoming = true;
            upComingMatchCount++;
          }
          matchResultEval = {
            teamA: {name: predictTeamAName},
            teamB: {name: predictTeamBName},
            result: '📅'
          };
        }

        //set match result only once.
        allPredictions[currentMatchNo] = { 
            match: matchResultEval,
            predict: {} 
        };
        
        if (isUpcoming && tournamentStillOn) {
            upcomingPredictions[currentMatchNo] = { 
                match: matchResultEval,
                predict: {} 
            };
        }
      }
  
      //predict
      var predictTeamAScore = row[4];
      var predictTeamBScore = row[5];
      var predictEval = {};  

      //points
      var predictPoints = matchStages[currentMatchStage].LostPoints;

      if ((0 == predictTeamAScore.length) && (0 == predictTeamBScore.length)) {
        //upcoming prediction
        predictEval = {
            type: '📅'
        }
      } else if ((-1 == predictTeamAScore) && (-1 == predictTeamBScore)) {
        //skipped prediction
        predictEval = {
            type: '➖'
        }
      } else if ((matchResultTeamAScore == predictTeamAScore) &&
        (matchResultTeamBScore == predictTeamBScore)) {
        //Perfect prediction
        predictPoints = matchStages[currentMatchStage].ScoreAndWinnerPoints;
        predictEval = {
            type: '🎯', result: matchResultEval?.result, 
            teamA: predictTeamAScore, teamB: predictTeamBScore,
            points: predictPoints
        }  
      } else if ((matchResultTeamAScore == matchResultTeamBScore) &&
        (predictTeamAScore == predictTeamBScore)) {
        //Only predicted the winner but score wasn't correct.
        predictPoints = matchStages[currentMatchStage].WinnerOnlyPoints;
        predictEval = {
            type: '🔺', result: matchResultEval?.result, 
            teamA: predictTeamAScore, teamB: predictTeamBScore,
            points: predictPoints
        }
      } else if ((matchResultTeamAScore > matchResultTeamBScore) &&
        (predictTeamAScore > predictTeamBScore)) {
        //Only predicted the winner but score wasn't correct.
        predictPoints = matchStages[currentMatchStage].WinnerOnlyPoints;
        predictEval = {
            type: '🔺', result: matchResultEval?.result, 
            teamA: predictTeamAScore, teamB: predictTeamBScore,
            points: predictPoints
        }        
      } else if ((matchResultTeamAScore < matchResultTeamBScore) &&
        (predictTeamAScore < predictTeamBScore)) {
        //Only predicted the winner but score wasn't correct.
        predictPoints = matchStages[currentMatchStage].WinnerOnlyPoints;
        predictEval = {
            type: '🔺', result: matchResultEval?.result, 
            teamA: predictTeamAScore, teamB: predictTeamBScore,
            points: predictPoints
        }        
      } else {
        //Not needed as variable is initalized but added for clarity
        predictPoints = matchStages[currentMatchStage].LostPoints;
        if (predictTeamAScore > predictTeamBScore) {
            predictEval = {
                type: '🔻', result: 'A-win', 
                teamA: predictTeamAScore, teamB: predictTeamBScore,
                points: predictPoints
            }
        } else if (predictTeamAScore < predictTeamBScore) {
            predictEval = {
                type: '🔻', result: 'B-win', 
                teamA: predictTeamAScore, teamB: predictTeamBScore,
                points: predictPoints
            }
        } else {
            predictEval = {
                type: '🔻', result: 'draw', 
                teamA: predictTeamAScore, teamB: predictTeamBScore,
                points: predictPoints
            }
        }
      }
  
      //whether match is complete or not initialize leaderboard
      if (!(participantName in leaderboard)) {
        leaderboard[participantName] = 0;
        leaderboardPredictScorePlusWinnerGameCount[participantName] = 0;
        leaderboardPredictWinnerGameCount[participantName] = 0;
        leaderboardPredictLossesGameCount[participantName] = 0;
        leaderboardPredictMatchesScorePlusWinner[participantName] = [];
        leaderboardPredictMatchesWinner[participantName] = [];
        leaderboardPredictMatchesLost[participantName] = [];
        leaderboardTotalPredicts[participantName] = 0;
        if (!('Total' in leaderboardTotalPredicts)) {
            leaderboardTotalPredicts['Total'] = 0;      
        }
      }
  
      if (matchComplete) {
        leaderboard[participantName] += predictPoints;
  
        if (predictPoints >= matchStages[currentMatchStage].WinnerOnlyPoints) {
          leaderboardPredictWinnerGameCount[participantName] += 1;
          leaderboardPredictMatchesWinner[participantName].push(predictEval);
        }
  
        if (predictPoints == matchStages[currentMatchStage].ScoreAndWinnerPoints) {
          leaderboardPredictScorePlusWinnerGameCount[participantName] += 1;
          leaderboardPredictMatchesScorePlusWinner[participantName].push(predictEval);
        }
  
        if (predictPoints == matchStages[currentMatchStage].LostPoints) {
          leaderboardPredictLossesGameCount[participantName] += 1;
          leaderboardPredictMatchesLost[participantName].push(predictEval);
        }
  
        updateLeaderBoardCatalog(keyOptions, participantName, predictPoints, 
            currentMatchStage, matchStages, leaderboardCatalog);
      } else {
        predictEval = {
            type: '📅'
        }
      }
      
      //add particpant's prediction.
      allPredictions[currentMatchNo].predict[participantName] = matchResultEval;
      if (isUpcoming && tournamentStillOn) {
        upcomingPredictions[currentMatchNo].predict[participantName] = matchResultEval;
      }
      if ('📅' != matchResultEval.result) {
        //increment the total predictions
        leaderboardTotalPredicts[participantName] += 1;
        leaderboardTotalPredicts['Total'] += 1;
      }      
    }
  
    var sortedLeaderboard = Object.keys(leaderboard) //Create a list from the keys of your map. 
      .sort( //Sort it ...
        function (a, b) { // using a custom sort function that...
          // compares (the keys) by their respective values.
          return leaderboard[b] - leaderboard[a];
    })

    //console.log("Leaderboard", leaderboard);
    this.setState({leaderboard: leaderboard});
    
    //console.log("leaderboardPredictScorePlusWinnerGameCount", leaderboardPredictScorePlusWinnerGameCount)
    this.setState({scorePlusWinCount: leaderboardPredictScorePlusWinnerGameCount});

    //console.log("leaderboardPredictWinnerGameCount", leaderboardPredictWinnerGameCount)
    this.setState({winCount: leaderboardPredictWinnerGameCount});

    //console.log("leaderboardPredictLossesGameCount", leaderboardPredictLossesGameCount)
    this.setState({losssCount: leaderboardPredictLossesGameCount});

    //console.log("leaderboardPredictMatchesScorePlusWinner", leaderboardPredictMatchesScorePlusWinner)
    this.setState({scorePlusLossCount: leaderboardPredictMatchesScorePlusWinner});

    //console.log("leaderboardPredictMatchesWinner", leaderboardPredictMatchesWinner)
    this.setState({matchWins: leaderboardPredictMatchesWinner});

    //console.log("leaderboardPredictMatchesLost", leaderboardPredictMatchesLost)
    this.setState({matchLoss: leaderboardPredictMatchesLost});

    //console.log("leaderboardTotalPredicts", leaderboardTotalPredicts)
    this.setState({totalPredicts: leaderboardTotalPredicts});

    //console.log("sortedLeaderboard", sortedLeaderboard)
    this.setState({sortedLeaderNames: sortedLeaderboard});

    //console.log("upcomingPredictions", upcomingPredictions)
    this.setState({upcomingGames: upcomingPredictions});

    //console.log("allPredictions", allPredictions)
    this.setState({allGames: allPredictions});
}

export function updateLeaderBoardCatalog(keyOptions, participantName, predictPoints, 
    currentMatchStage, matchStages, leaderboardCatalog) {

    checkAndInitialize(participantName, keyOptions, leaderboardCatalog);
  
    //find participantName in the array
    for (var i = 0; i < leaderboardCatalog.length; i++) {
      if (leaderboardCatalog[i][keyOptions[0]] == participantName) {
        var leaderBoardItem = leaderboardCatalog[i];
        
        //update total prediction points
        leaderBoardItem[keyOptions[1]] += predictPoints;
  
        //count correct score prediction
        if (predictPoints == matchStages[currentMatchStage].ScoreAndWinnerPoints) {
          leaderBoardItem[keyOptions[2]] += 1;
        }
  
        //count winner only predictions
        if (predictPoints >= matchStages[currentMatchStage].WinnerOnlyPoints) {
          leaderBoardItem[keyOptions[3]] += 1;
        }
  
        //count lost predictions
        if (predictPoints == matchStages[currentMatchStage].LostPoints) {
          leaderBoardItem[keyOptions[4]] += 1;
        }
  
        //update total number of matches
        leaderBoardItem[keyOptions[5]] += 1;
  
        matchStages.forEach(initializeStageLeaderBoards);
  
        function initializeStageLeaderBoards(value, index, array) {
          //stage points, prefect prediction, winner only & lost
          leaderBoardItem[value['Desc'] + " points"] += predictPoints;
          if (predictPoints == matchStages[currentMatchStage].ScoreAndWinnerPoints) {
            leaderBoardItem[value['Desc'] + " score predict matches"] += 1;
          }
  
          if (predictPoints >= matchStages[currentMatchStage].WinnerOnlyPoints) {
            leaderBoardItem[value['Desc'] + " winner predict matches"] += 1;
          }
  
          if (predictPoints == matchStages[currentMatchStage].LostPoints) {
            leaderBoardItem[value['Desc'] + " predict lost matches"] += 1;
          }
        }
      }
    }
}

  //start parsing prediction csv file
function buildPredictConfig() {
    return {
      delimiter: "", // auto-detect
      newline: "", // auto-detect
      header: false,
      dynamicTyping: false,
      preview: 0,
      step: undefined,
      encoding: "",
      worker: false,
      comments: false,
      complete: completePredictFn,
      error: errorFn,
      download: true,
      fastMode: undefined,
      skipEmptyLines: false,
      chunk: undefined,
      beforeFirstChunk: undefined,
    };
  }

  //read the results csv file
function buildResultsConfig() {
    return {
      delimiter: "", // auto-detect
      newline: "", // auto-detect
      header: false,
      dynamicTyping: false,
      preview: 0,
      step: undefined,
      encoding: "",
      worker: false,
      comments: false,
      complete: completeResultsFn,
      error: errorFn,
      download: true,
      fastMode: undefined,
      skipEmptyLines: false,
      chunk: undefined,
      beforeFirstChunk: undefined,
    };
  }

  function checkAndInitialize(pName, keyOptions, leaderboardCatalog) {
    var pFound = false;
    //find participantName in the array
    for (var i = 0; i < leaderboardCatalog.length; i++) {
      var leaderBoardItem = leaderboardCatalog[i];
      if (leaderBoardItem[keyOptions[0]] == pName) {
        pFound = true;
        break;
      }
    }
  
    if (pFound == false) {
      var pKeyName = keyOptions[0];
      var leaderBoardItem = {};
      leaderBoardItem[pKeyName] = pName;
      for (var k = 1; k < keyOptions.length; k++) {
        leaderBoardItem[keyOptions[k]] = 0;
      }
      leaderboardCatalog.push(leaderBoardItem);
    }
  }

  function errorFn(err, file) {
    console.log("ERROR:", err, file);
  }