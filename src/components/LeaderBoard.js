import {avatarImages} from '../const/avatarImg'

function LeaderBoard (props) {
        const tableHeader = ['Name', 'Total Points'];
        return (
        <div className="section-heading text-center pt-3 pb-3">
            <h2>Leader Board - {props.tournamentName}</h2>
            <p className="text-muted">Leader board shows the overrall points of the participants.</p>
            <table className="table table-condensed ">
                <thead>
                    <tr>
                        <th colSpan='2'>{tableHeader[0]}</th>
                        <th>{tableHeader[1]}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.leaderNames?.map((row, index)=>
                            <tr key={index}>
                                <td align="right"><img src={process.env.PUBLIC_URL + avatarImages[row]} alt="Avatar images" width="30" /></td>
                                <td align="left">{row}</td>
                                <td className="text-center">
                                  {(props.totalPredicts === 0) &&
                                    '📅'
                                  }
                                  <span  className={(props.totalPredicts > 0) ? 'fw-bold' : 'visually-hidden'}>{props.leaderBoard[row]}</span><br/>
                                  <div className={(props.totalPredicts > 0) ? 'visually-hidden' : 'visually-hidden'}>
                                    🎯({props.countScorePlusWin[row]}), 
                                    ✅({props.countWin[row]}), 
                                    ❌({props.countLost[row]})
                                  </div>
                                </td>
                            </tr>
                        )
                    }
                </tbody>                
            </table>
        </div>
        );
    }
  
  export default LeaderBoard;
  