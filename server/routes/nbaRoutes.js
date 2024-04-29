import express from 'express';
import fetchNBATeamLogos from '../services/fetchNBATeamLogos.js';

const router = express.Router();

router.get('/nba-logos', async (req, res) => {
    console.log("Endpoint /api/nba-logos hit");
    try {
        const nbaData = await fetchNBATeamLogos();
        res.json(nbaData)
    } catch (error) {
        console.error('Error in /routes/nbaRoutes:', error.message);
        res.status(500).json({ message: 'Failed to fetch NBA logos'})
    }
});

export default router;