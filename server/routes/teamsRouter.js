import express from 'express';
import {
    getNbaTeamsGuesserData,
    getNflTeamsGuesserData,
} from "../services/leagueService.js";

const router = express.Router();

router.get("/nba/team-guesser", async (req, res) => {
    try {
        const data = await getNbaTeamsGuesserData();
        res.json(data);
    } catch (error) {
        console.error('Error fetching NBA team guess game data:', error.message);
        res.status(500).json({ message: 'Failed to fetch NBA team guess game data' })
    }

});

router.get("/nfl/team-guesser", async (req, res) => {
    try {
        const data = await getNflTeamsGuesserData();
        res.json(data);
    } catch (error) {
        console.error('Error fetching NFL team guess game data:', error.message);
        res.status(500).json({ message: 'Failed to fetch NFL team guess game data' })
    }
});

export default router;