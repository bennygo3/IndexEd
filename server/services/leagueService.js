import pool from "../connection/postgres.js";

async function buildLeagueTeamsGuesser({
    conferencesTable,
    divisionsTable,
    teamsTable,
}) {
    const query = `
        SELECT
            ${conferencesTable}.name AS conference,
            ${divisionsTable}.name AS division,
            ${teamsTable}.location,
            ${teamsTable}.name,
            ${teamsTable}.abbreviation,
            ${teamsTable}.logo_url
        FROM ${teamsTable}
        INNER JOIN ${divisionsTable}
            ON ${teamsTable}.division_id = ${divisionsTable}.id
        INNER JOIN ${conferencesTable}
            ON ${divisionsTable}.conference_id = ${conferencesTable}.id
        ORDER BY
            ${conferencesTable}.name,
            ${divisionsTable}.name,
            ${teamsTable}.location,
            ${teamsTable}.name;
    `;

    const result = await pool.query(query);

    const grouped = [];

    for (const row of result.rows) {

        let conferenceGroup =
            grouped.find(item => item.conference === row.conference);

        if (!conferenceGroup) {
            conferenceGroup = {
                conference: row.conference,
                divisions: [],
            };

            grouped.push(conferenceGroup);
        }

        let divisionGroup =
            conferenceGroup.divisions.find(
                item => item.name === row.division
            );

        if (!divisionGroup) {
            divisionGroup = {
                name: row.division,
                teams: [],
            };

            conferenceGroup.divisions.push(divisionGroup);
        }

        divisionGroup.teams.push({
            location: row.location,
            name: row.name,
            abbreviation: row.abbreviation,
            logoUrl: row.logo_url,
        });
    }

    return grouped;
}

// NBA wrapper
export async function getNbaTeamsGuesserData() {
    return buildLeagueTeamsGuesser({
        conferencesTable: "nba_conferences",
        divisionsTable: "nba_divisions",
        teamsTable: "nba_teams",
    });
}

// NFL wrapper
export async function getNflTeamsGuesserData() {
    return buildLeagueTeamsGuesser({
        conferencesTable: "nfl_conferences",
        divisionsTable: "nfl_divisions",
        teamsTable: "nfl_teams",
    });
}