import pool from "../connection/postgres.js";

export async function getAllNbaTeams() {
    const result = await pool.query(`
        SELECT 
            teams.location,
            teams.name,
            teams.abbreviation,
            teams.logo_url,
            divisions.name AS division,
            conferences.name AS conference
        FROM teams
        INNER JOIN divisions
            ON teams.division_id = divisions.id
        INNER JOIN conferences
            ON divisions.conference_id = conferences.id
        ORDER BY
            conferences.name,
            divisions.name,
            teams.location,
            teams.name
    `);

    return result.rows;
}

export async function getNbaTeamsGuesserData() {
    const query = `
        SELECT
            conferences.name AS conference,
            divisions.name AS division,
            teams.location,
            teams.name,
            teams.abbreviation
        FROM teams
        INNER JOIN divisions
            ON teams.division_id = divisions.id
        INNER JOIN conferences
            ON divisions.conference_id = conferences.id
        ORDER BY
            conferences.name,
            divisions.name,
            teams.location,
            teams.name;
    `;

    const result = await pool.query(query);

    const grouped = [];

    for (const row of result.rows) {
        let conference = grouped.find(item => item.conference === row.conference);

        if (!conference) {
            conference = {
                conference: row.conference,
                divisions: [],
            };

            grouped.push(conference);
        }

        let division = conference.divisions.find(item => item.name === row.division);

        if (!division) {
            division = {
                name: row.division,
                teams: [],
            };

            conference.divisions.push(division);

        }

        division.teams.push({
            location: row.location,
            name: row.name,
            abbreviation: row.abbreviation,
        });
    }

    return grouped;
}