import React, { useState } from 'react';
import Card from '../../../../components/Card/Card.js';
import './nbaLogos.css'

export default function NbaLogos() {
    const [nbaLogos, setNbaLogos] = useState([]);

    const fetchNbaLogos = async () => {
        const nbaUrl = 'https://tank01-fantasy-stats.p.rapidapi.com/getNBATeams?schedules=true&rosters=true&topPerformers=true&teamStats=true&statsToGet=averages';
        const nbaOptions = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_NBARAPIDAPI_KEY,
                'X-RapisAPI-Host': 'tank01-fantasy-stats.p.rapidapi.com'
            }
        };
    }
}
