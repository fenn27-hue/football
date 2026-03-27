const axios = require('axios');

const handler = async (req, res) => {
    try {
        // Get Premier League matches (competition code: PL)
        const options = {
            method: 'GET',
            url: 'https://api.football-data.org/v4/competitions/PL/matches?status=SCHEDULED',
            headers: {
                'X-Auth-Token': process.env.FOOTBALL_API_TOKEN
            }
        };
        
        const response = await axios(options);
        
        // Filter for matches in the coming weekend (Friday to Monday)
        const now = new Date();
        const matches = response.data.matches.filter(match => {
            const matchDate = new Date(match.utcDate);
            const daysFromNow = Math.floor((matchDate - now) / (1000 * 60 * 60 * 24));
            // Show matches within next 7 days
            return daysFromNow >= 0 && daysFromNow <= 7;
        });
        
        res.status(200).json({ matches });
    } catch (error) {
        console.error('Error fetching Premier League matches:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = handler;