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