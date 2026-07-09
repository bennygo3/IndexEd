INSERT INTO nba_conferences (name)
VALUES 
    ('Eastern'),
    ('Western');

INSERT INTO nba_divisions (name, conference_id)
VALUES
(
    'Atlantic',
    (
        SELECT id
        FROM nba_conferences
        WHERE name = 'Eastern'
    )
),
(
    'Central',
    (
        SELECT id
        FROM nba_conferences
        WHERE name = 'Eastern'
    )
),
(
    'Southeast',
    (
        SELECT id
        FROM nba_conferences
        WHERE name = 'Eastern'
    )
),
(
    'Northwest',
    (
        SELECT id
        FROM nba_conferences
        WHERE name = 'Western'
    )
),
(
    'Pacific',
    (
        SELECT id
        FROM nba_conferences
        WHERE name = 'Western'
    )
),
(
    'Southwest',
    (
        SELECT id
        FROM nba_conferences
        WHERE name = 'Western'
    )
);

-- ATLANTIC DIVISION --

WITH atlantic AS (
    SELECT id
    FROM nba_divisions
    WHERE name = 'Atlantic'
)

INSERT INTO nba_teams (location, name, abbreviation, logo_url, division_id)
VALUES
(
    'Boston',
    'Celtics',
    'BOS',
    NULL,
    (SELECT id FROM atlantic)
),
(
    'Brooklyn',
    'Nets',
    'BKN',
    NULL,
    (SELECT id FROM atlantic)
),
(
    'New York',
    'Knicks',
    'NYK',
    NULL,
    (SELECT id FROM atlantic)
),
(
    'Philadelphia',
    '76ers',
    'PHI',
    NULL,
    (SELECT id FROM atlantic)
),
(
    'Toronto',
    'Raptors',
    'TOR',
    NULL,
    (SELECT id FROM atlantic)
);

-- CENTRAL DIVISION --

WITH central AS (
    SELECT id
    FROM nba_divisions
    WHERE name = 'Central'
)

INSERT INTO nba_teams (location, name, abbreviation, logo_url, division_id)
VALUES
(
    'Chicago',
    'Bulls',
    'CHI',
    NULL,
    (SELECT id FROM central)
),
(
    'Cleveland',
    'Cavaliers',
    'CLE',
    NULL,
    (SELECT id FROM central)
),
(
    'Detroit',
    'Pistons',
    'DET',
    NULL,
    (SELECT id FROM central)
),
(
    'Indiana',
    'Pacers',
    'IND',
    NULL,
    (SELECT id FROM central)
),
(
    'Milwaukee',
    'Bucks',
    'MIL',
    NULL,
    (SELECT id FROM central)
);

-- SOUTHEAST DIVISION --

WITH southeast AS (
    SELECT id
    FROM divisions
    WHERE name = 'Southeast'
)

INSERT INTO teams (location, name, abbreviation, logo_url, division_id)
VALUES
(
    'Atlanta',
    'Hawks',
    'ATL',
    NULL,
    (SELECT id FROM southeast)
),
(
    'Charlotte',
    'Hornets',
    'CHA',
    NULL,
    (SELECT id FROM southeast)
),
(
    'Miami',
    'Heat',
    'MIA',
    NULL,
    (SELECT id FROM southeast)
),
(
    'Orlando',
    'Magic',
    'ORL',
    NULL,
    (SELECT id FROM southeast)
),
(
    'Washington',
    'Wizards',
    'WAS',
    NULL,
    (SELECT id FROM southeast)
);

-- NORTHWEST DIVISION --

WITH northwest AS (
    SELECT id
    FROM divisions
    WHERE name = 'Northwest'
)

INSERT INTO teams (location, name, abbreviation, logo_url, division_id)
VALUES
(
    'Denver',
    'Nuggets',
    'DEN',
    NULL,
    (SELECT id FROM northwest)
),
(
    'Minnesota',
    'Timberwolves',
    'MIN',
    NULL,
    (SELECT id FROM northwest)
),
(
    'Oklahoma City',
    'Thunder',
    'OKC',
    NULL,
    (SELECT id FROM northwest)
),
(
    'Portland',
    'Trail Blazers',
    'POR',
    NULL,
    (SELECT id FROM northwest)
),
(
    'Utah',
    'Jazz',
    'UTA',
    NULL,
    (SELECT id FROM northwest)
);

-- PACIFIC DIVISION --

WITH pacific AS (
    SELECT id
    FROM divisions
    WHERE name = 'Pacific'
)

INSERT INTO teams (location, name, abbreviation, logo_url, division_id)
VALUES
(
    'Golden State',
    'Warriors',
    'GSW',
    NULL,
    (SELECT id FROM pacific)
),
(
    'Los Angeles',
    'Clippers',
    'LAC',
    NULL,
    (SELECT id FROM pacific)
),
(
    'Los Angeles',
    'Lakers',
    'LAL',
    NULL,
    (SELECT id FROM pacific)
),
(
    'Phoenix',
    'Suns',
    'PHX',
    NULL,
    (SELECT id FROM pacific)
),
(
    'Sacramento',
    'Kings',
    'SAC',
    NULL,
    (SELECT id FROM pacific)
);

-- SOUTHWEST DIVISION --

WITH southwest AS (
    SELECT id
    FROM divisions
    WHERE name = 'Southwest'
)

INSERT INTO teams (location, name, abbreviation, logo_url, division_id)
VALUES
(
    'Dallas',
    'Mavericks',
    'DAL',
    NULL,
    (SELECT id FROM southwest)
),
(
    'Houston',
    'Rockets',
    'HOU',
    NULL,
    (SELECT id FROM southwest)
),
(
    'Memphis',
    'Grizzlies',
    'MEM',
    NULL,
    (SELECT id FROM southwest)
),
(
    'New Orleans',
    'Pelicans',
    'NOP',
    NULL,
    (SELECT id FROM southwest)
),
(
    'San Antonio',
    'Spurs',
    'SAS',
    NULL,
    (SELECT id FROM southwest)
);

-- SELECT 
--     location,
--     teams.name AS team_name,
--     divisions.name AS division_name
-- FROM teams
-- INNER JOIN divisions
--     ON teams.division_id = divisions.id;

-- SELECT 
--     location,
--     teams.name AS team_name,
--     divisions.name AS division_name,
--     conferences.name AS conference_name
-- FROM teams
--     INNER JOIN divisions 
--     ON teams.division_id = divisions.id
--     INNER JOIN conferences
--     ON divisions.conference_id = conferences.id

SELECT 
    teams.location,
    teams.name AS team_name,
    divisions.name AS division_name,
    conferences.name AS conference_name
FROM teams
INNER JOIN divisions 
    ON teams.division_id = divisions.id
INNER JOIN conferences
    ON divisions.conference_id = conferences.id
ORDER BY 
    conferences.name,
    divisions.name,
    teams.location;
    
