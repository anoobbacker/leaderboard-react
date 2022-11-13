import {team3To2LetterAcronym } from '../const/teamNameAndFlag'
import {avatarImages} from '../const/avatarImg'

function MatchPredictions(props) {
  const tableHeader = ['Match', 'Name', 'Predict', 'Points'];
  if (props.allPredictions?.length != 0 ) {
      return (
      <div className="section-heading text-center pb-3">
        <h2>Match predictions</h2>
        <p className="text-muted">Breakup of the prediction made by participants for upcoming stage.</p>
        <br/>
        <table className="table table-condensed ">
                <thead>
                    <tr>
                        <th>{tableHeader[0]}</th>
                        <th colSpan='2'>{tableHeader[1]}</th>
                        <th>{tableHeader[2]}</th>
                        <th>{tableHeader[3]}</th>
                    </tr>
                </thead>
                <tbody>
                    {props.allPredictions?.map((row, rIndex)=>
                      Object.keys(row.predict)?.map((pName,index)=>  
                        <tr key={'m' + rIndex + 'r' + index}>
                          {index == 0 &&
                            <td className="text-center" rowSpan={Object.keys(row.predict)?.length}>
                              <span className={(row.match.result == 'A-win') ? 'fw-bold' : 'fw-normal'}>
                                <img src={process.env.PUBLIC_URL + '/assets/img/country-flags-main/' + team3To2LetterAcronym[row.match.teamA.name] + '.svg'} height='16px' />
                                &nbsp;{row.match.teamA.name}({row.match.teamA.score})
                              </span>
                              <br />
                              <span className={(row.match.result == 'B-win') ? 'fw-bold' : 'fw-normal'}><img src={process.env.PUBLIC_URL + '/assets/img/country-flags-main/' + team3To2LetterAcronym[row.match.teamB.name] + '.svg'} height='16px' />&nbsp;{row.match.teamB.name}({row.match.teamB.score})</span>
                            </td>                          
                          }
                          <td><img src={process.env.PUBLIC_URL + avatarImages[pName]} width="30" /></td>
                          <td align="left">{pName}</td>
                          <td className="text-center">                            
                              <span className={(row.predict[pName].result == 'A-win') ? 'fw-bold' : 'fw-normal'}>{row.match.teamA.name}({row.predict[pName].teamA})</span><br />
                              <span className={(row.predict[pName].result == 'B-win') ? 'fw-bold' : 'fw-normal'}>{row.match.teamB.name}({row.predict[pName].teamB})</span>
                          </td>
                          <td className="text-center">
                          {row.predict[pName].type}{row.predict[pName].points}
                          </td>                        
                        </tr>
                      )
                    )}
                </tbody>                
            </table>       
      </div>
      );
  }
}

  
export default MatchPredictions;
  