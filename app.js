const fetch = require('node-fetch');

const API_URL = 'https://api.football-data.org/v2/matches';
const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key

async function fetchLiveScores() {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'X-Auth-Token': API_KEY,
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const liveMatches = data.matches.filter(match => match.status === 'LIVE');

        console.log('Live UK Football Scores:');
        liveMatches.forEach(match => {
            console.log(`Match: ${match.homeTeam.name} vs ${match.awayTeam.name} | Score: ${match.score.fullTime.home} - ${match.score.fullTime.away}`);
        });
    } catch (error) {
        console.error('Error fetching live scores:', error);
    }
}

fetchLiveScores();