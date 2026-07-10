// import pool from "../connection/postgres.js";

// export async function getAllNbaTeams() {
//     const result = await pool.query(`
//         SELECT 
//             nba_teams.location,
//             nba_teams.name,
//             nba_teams.abbreviation,
//             nba_teams.logo_url,
//             nba_divisions.name AS division,
//             nba_conferences.name AS conference
//         FROM nba_teams
//         INNER JOIN nba_divisions
//             ON nba_teams.division_id = nba_divisions.id
//         INNER JOIN conferences
//             ON nba_divisions.conference_id = nba_conferences.id
//         ORDER BY
//             nba_conferences.name,
//             nba_divisions.name,
//             nba_teams.location,
//             nba_teams.name
//     `);

//     return result.rows;
// }

// export async function getNbaTeamsGuesserData() {
//     const query = `
//         SELECT
//             nba_conferences.name AS conference,
//             nba_divisions.name AS division,
//             nba_teams.location,
//             nba_teams.name,
//             nba_teams.abbreviation
//         FROM nba_teams
//         INNER JOIN nba_divisions
//             ON nba_teams.division_id = nba_divisions.id
//         INNER JOIN nba_conferences
//             ON nba_divisions.conference_id = nba_conferences.id
//         ORDER BY
//             nba_conferences.name,
//             nba_divisions.name,
//             nba_teams.location,
//             nba_teams.name;
//     `;

//     const result = await pool.query(query);

//     const grouped = [];

//     for (const row of result.rows) {
//         let conferenceGroup = grouped.find(
//             item => item.conference === row.conference
//         );

//         if (!conferenceGroup) {
//             conferenceGroup = {
//                 conference: row.conference,
//                 divisions: [],
//             };

//             grouped.push(conferenceGroup);
//         }

//         let divisionGroup = conferenceGroup.divisions.find(
//             item => item.name === row.division
//         );

//         if (!divisionGroup) {
//             divisionGroup = {
//                 name: row.division,
//                 teams: [],
//             };

//             conferenceGroup.divisions.push(divisionGroup);

//         }

//         divisionGroup.teams.push({
//             location: row.location,
//             name: row.name,
//             abbreviation: row.abbreviation,
//         });
//     }

//     return grouped;
// }