import express from 'express';
import fetchNBATeamLogos from '../services/fetchNBATeamLogos.js';
import { 
    getAllNbaTeams,
    getNbaTeamsGuesserData,
} from '../services/nbaService.js';

const router = express.Router();

router.get('/logos', async (req, res) => {
    console.log("Endpoint /api/nba/logos hit");
    try {
        const nbaData = await fetchNBATeamLogos();
        res.json(nbaData)
    } catch (error) {
        console.error('Error in /routes/nbaRoutes:', error.message);
        res.status(500).json({ message: 'Failed to fetch NBA logos'})
    }
});

router.get('/teams', async (req, res) => {
    try {
        const teams = await getAllNbaTeams();
        res.json(teams);
    } catch (error) {
        console.error('Error fetching NBA teams from PostgreSQL:', error.message);
        res.status(500).json({ message: 'Failed to fetch NBA teams' });
    }
});

router.get('/team-guesser', async (req, res) => {
    try {
        const data = await getNbaTeamsGuesserData();
        res.json(data);
    } catch (error) {
        console.error('Error fetching NBA team guess game data:', error.message);
        res.status(500).json({ message: 'Failed to fetch NBA team guess game data' })
    }
});

export default router;