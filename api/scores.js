const https = require('https');

exports.handler = async (event) => {
    const options = {
        hostname: 'api.football-data.org',
        path: event.path,
        method: event.httpMethod,
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': 'YOUR_API_TOKEN' // Replace with your football-data.org API token
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => data += chunk);

            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    body: data,
                    headers: { 'Content-Type': 'application/json' }
                });
            });
        });

        req.on('error', (error) => reject(error));
        req.end();
    });
};
