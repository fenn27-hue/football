const axios = require('axios');

const getScores = async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://api.football-data.org/v2/scores',
        headers: {
            'X-Auth-Token': process.env.FOOTBALL_API_TOKEN
        }
    };
    try {
        const response = await axios(options);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getScores;