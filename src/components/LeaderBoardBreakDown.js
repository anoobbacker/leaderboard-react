import {avatarImages} from '../const/avatarImg'

function LeaderBoardBreakDown(props) {
    const tableHeader = ['Name', '🎯Perfect scores', '✅Only Winner', '❌Lost'];
    return (
    <div className="section-heading text-center pb-3">
      <h2>Leader Board break down</h2>
      <p className="text-muted">Shows the leader board details. To see all the predictions scroll down to 'All predictions' section.</p>
      <br/>
      <table className="table table-condensed ">
                <thead>
                    <tr>
                        <th colSpan='2'>{tableHeader[0]}</th>
                        <th>{tableHeader[1]}</th>
                        <th>{tableHeader[2]}</th>
                        <th>{tableHeader[3]}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.leaderNames?.map((row, index)=>
                            <tr key={index}>
                                <td align="right"><img src={process.env.PUBLIC_URL + avatarImages[row]} width="30" /></td>
                                <td align="left">{row}</td>
                                <td className="text-center">{props.countScorePlusWin
[row]}</td>
                                <td className="text-center">{props.countWin
    [row]}</td>
                                <td className="text-center">{props.countLost
    [row]}</td>
                            </tr>
                        )
                    }
                </tbody>                
            </table>      
    </div>
    );
  }
  
  export default LeaderBoardBreakDown;
  