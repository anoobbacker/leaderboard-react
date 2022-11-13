export var euro2020ResultsURL = "https://betwc.blob.core.windows.net/betwec/results-eurocup2020.csv?ver=" + Math.random();
export var euro2020PredictionDataURL = "https://betwc.blob.core.windows.net/betwec/predict-eurocup2020.csv?ver="+ Math.random();

export var euro2020MatchStages = [
    //stage1
    {
      MatchNumber: 1,
      Desc: 'Groupstage',
      StageStartDate: 'June 11, 2021',
      StageEndDate: 'June 23, 2021',
      Stage: 0,
      ScoreAndWinnerPoints: 3,
      WinnerOnlyPoints: 1,
      LostPoints: 0
    },
    //round of 16
    {
      MatchNumber: 37,
      Desc: 'Round of 16',
      StageStartDate: 'June 26, 2021',
      StageEndDate: 'June 30, 2021',
      Stage: 1,
      ScoreAndWinnerPoints: 3,
      WinnerOnlyPoints: 1,
      LostPoints: 0
    },
    //quarter-finals
    {
      MatchNumber: 45,
      Desc: 'Quarter finals',
      StageStartDate: 'July 2, 2021',
      StageEndDate: 'July 4, 2021',
      Stage: 2,
      ScoreAndWinnerPoints: 5,
      WinnerOnlyPoints: 3,
      LostPoints: -1
    },
    //semi-finals
    {
      MatchNumber: 49,
      Desc: 'Semi finals',
      StageStartDate: 'July 7, 2021',
      StageEndDate: 'July 8, 2021',
      Stage: 3,
      ScoreAndWinnerPoints: 15,
      WinnerOnlyPoints: 5,
      LostPoints: -5
    },
    //finals
    {
      MatchNumber: 51,
      Desc: 'Finals',
      StageStartDate: 'July 12, 2021',
      StageEndDate: 'July 12, 2021',
      Stage: 4,
      ScoreAndWinnerPoints: 40,
      WinnerOnlyPoints: 15,
      LostPoints: -10,
      IsFinal: 'True'
    }
  ];