import React from 'react';

class Intro extends React.Component {
    render() {
        // let value = this.context;
        // console.log("Intro render Context: ", value)
        return (
            <div className="mb-5 mb-lg-0 text-center text-lg-start">
                <h1 className="display-1 lh-1 mb-3">Kotas Prediction Leaderboard.</h1>
                <p className="lead fw-normal text-muted mb-3">A fun friendly football prediction leaderboard! 🤞</p>
                <table className="text-muted mb-3">
                    <thead>
                    <tr>
                        <th>Round</th>
                        <th>🎯 Prefect score points</th>
                        <th>✅ Only winner points</th>
                        <th>❌Wrong points</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Till 16s</td>
                            <td className="text-center">3</td>
                            <td className="text-center">1</td>
                            <td className="text-center">0</td>
                        </tr>
                        <tr>
                            <td>Quaterfinals</td>
                            <td className="text-center">5</td>
                            <td className="text-center">3</td>
                            <td className="text-center">-1</td>
                        </tr>
                        <tr>
                            <td>Semifinals</td>
                            <td className="text-center">15</td>
                            <td className="text-center">5</td>
                            <td className="text-center">-5</td>
                        </tr>
                        <tr>
                            <td>Finals</td>
                            <td className="text-center">40</td>
                            <td className="text-center">15</td>
                            <td className="text-center">-10</td>
                        </tr>
                    </tbody> 
                </table>
            </div>                        
        );
    }
}

export default Intro;