import React from 'react';
import { TournamentContext, Tournaments } from './components/TournamentContext';

function DropdownMenu() {
    return (
        <TournamentContext.Consumer>
            {({tournament, switchTournament}) => (
                <div className="container mb-5 mb-lg-0 text-center text-lg-start">
                <div id="simple-list-example" className="dropdown simple-list-example-scrollspy">
                    <a className="btn btn-secondary dropdown-toggle" href="#" tabIndex="0" role="button" data-bs-toggle="dropdown" aria-expanded="false">View Leaderboard</a>
                    <ul className="dropdown-menu" onClick={switchTournament} key={tournament}>
                        {Object.keys(Tournaments)?.map((row,index)=>
                            <li key={index}><a className="dropdown-item" href="#leaderboards">{Tournaments[row].name}</a></li>
                        )}
                    </ul> 
                </div>
                </div>
            )}
        </TournamentContext.Consumer>
    );
}

export default DropdownMenu;