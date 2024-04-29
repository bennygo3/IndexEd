import fetch from 'node-fetch';

const fetchNBATeamLogos = async () => {
    const nbaUrl = 'https://tank01-fantasy-stats.p.rapidapi.com/getNBATeams?schedules=true&rosters=true&topPerformers=true&teamStats=true&statsToGet=averages';
    const nbaOptions = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.NBARAPIDAPI_KEY,
            'X-RapidAPI-Host': 'tank01-fantasy-stats.p.rapidapi.com'
        }
    };

    try {
        const nbaResponse = await fetch(nbaUrl, nbaOptions);
        if(!nbaResponse.ok) {
            throw new Error(`HTTP error! status: ${nbaResponse.status}`);
        }
        return await nbaResponse.json();
    } catch (error) {
        console.error('Failed to fetch NBA team logos:', error);
        throw error; // Rethrow to handle the error in the route
    }
};

export default fetchNBATeamLogos;