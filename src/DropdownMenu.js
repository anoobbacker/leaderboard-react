import React from 'react';
import { TournamentContext, Tournaments } from './components/TournamentContext';

function DropdownMenu() {
    return (
        <TournamentContext.Consumer>
            {({tournament, switchTournament}) => (
                <aside className="text-center mb-2">
                <div className="container">
                <div className="h2 fs-3 text-black mb-4">Click the button below to find the leaderboard topper!</div>
                <div className="d-flex flex-column flex-lg-row align-items-center justify-content-center">
                    <div id="simple-list-example" className="dropdown simple-list-example-scrollspy">
                        <a className="btn btn-secondary dropdown-toggle bg-dark" href="#" tabIndex="0" role="button" data-bs-toggle="dropdown" aria-expanded="false">View Leaderboard</a>
                        <ul className="dropdown-menu" onClick={switchTournament} key={tournament}>
                            {Object.keys(Tournaments)?.map((row,index)=>
                                <li key={index}><a className="dropdown-item" href="#leaderboards">{Tournaments[row].name}</a></li>
                            )}
                        </ul> 
                    </div>
                </div>
                </div>
                </aside>
            )}
        </TournamentContext.Consumer>
    );
}

export default DropdownMenu;