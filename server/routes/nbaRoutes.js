import express from 'express';
import fetchNBATeamLogos from '../services/fetchNBATeamLogos';

const router = express.Router();

router.get('/nba-teams', async (req, res) => {
    try {
        const nbaData = await fetchNBATeamLogos();
        res.json(nbaData)
    } catch (error) {
        console.error('Error in /routes/nbaRoutes:', error.message);
        res.status(500).json({ message: 'Failed to fetch NBA logos'})
    }
});

export default router;