import React, { useEffect, useState } from 'react';
import './Leaderboard.css';
import transitionhill from '../assets/transition-hill.png';
import axios from 'axios';

function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get('crowd-funding-back-production.up.railway.app/leaderboard'); // Match the backend route
            setLeaderboardData(response.data);
        } catch (error) {
            console.error('Error fetching leaderboard data:', error);
            setError('Unable to load leaderboard data. Please try again later.');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div id="scroll2">
            <div className="leaderboard">
                <h1 className="leaderboard-h1">LEADERBOARD</h1>
                {error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    <ul>
                        {leaderboardData.map((entry, index) => (
                            <li key={index}>
                                <div className="leaderboard-entry-details">
                                    <div className="leaderboard-entry-logo">🌳</div>
                                    <div className="leaderboard-entry-user">
                                        <span className="leaderboard-entry-name">
                                            {entry.name || 'Anonymous'}
                                        </span>
                                        <br />
                                        <span className="leaderboard-entry-comment">
                                            "{entry.message || 'No message'}"
                                        </span>
                                    </div>
                                    <span className="leaderboard-entry-amount">
                                        {entry.amount/100} Trees
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <img
                src={transitionhill}
                style={{ width: '100%', marginBottom: '-150px' }}
                alt="Decorative Hill"
            />
        </div>
    );
}

export default Leaderboard;
