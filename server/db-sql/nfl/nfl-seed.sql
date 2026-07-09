INSERT INTO nfl_conferences (name)
VALUES 
    ('AFC'),
    ('NFC');

INSERT INTO nfl_divisions (name, conference_id)
VALUES 
(
    'AFC North',
    (
        SELECT id
        FROM nfl_conferences
        WHERE name = 'AFC'
    )
),
(
    'AFC East',
    (
        SELECT id
        FROM nfl_conferences
        WHERE name = 'AFC'
    )
),
(
    'AFC South',
    (
        SELECT id
        FROM nfl_conferences
        WHERE name = 'AFC'
    )
),
(
    'AFC West',
    (
        SELECT id
        FROM nfl_conferences
        WHERE name = 'AFC'
    )
),
(
    'NFC North',
    (
        SELECT id
        FROM nfl_conferences
        WHERE name = 'NFC'
    )
),
(
    'NFC East',
    (
        SELECT id
        FROM nfl_conferences
        WHERE name = 'NFC'
    )
),
(
    'NFC South',
    (
        SELECT id
        FROM nfl_conferences
        WHERE name = 'NFC'
    )
),
(
    'NFC West',
    (
        SELECT id
        FROM nfl_conferences
        WHERE name = 'NFC'
    )
);

-- TEAMS --

-- Ravens, Bengals, Browns, Steelers

WITH afc_north AS (
    SELECT id
    FROM nfl_divisions
    WHERE name = 'AFC North'
)

INSERT INTO nfl_teams (location, name, abbreviation, logo_url, division_id)
VALUES
(
    'Baltimore',
    'Ravens',
    'BAL',
    NULL,
    (SELECT id FROM afc_north)
),
(
    'Cincinnati',
    'Bengals',
    'CIN',
    NULL,
    (SELECT id FROM afc_north)
),
(
    'Cleveland',
    'Browns',
    'CLE',
    NULL,
    (SELECT id FROM afc_north)
),
(
    'Pittsburgh',
    'Steelers',
    'PIT',
    NULL,
    (SELECT id FROM afc_north)
);

-- Bills, Dolphins, Pats, Jets

WITH afc_east AS (
    SELECT id 
    FROM nfl_divisions
    WHERE name = 'AFC East'
)

INSERT INTO nfl_teams (location, name, abbreviation, logo_url, division_id)
VALUES
(
    'Buffalo',
    'Bills',
    'BUF',
    NULL,
    (SELECT id FROM afc_east)
),
(
    'Miami',
    'Dolphins',
    'MIA',
    NULL,
    (SELECT id FROM afc_east)
),
(
    'New England',
    'Patriots',
    'NWE',
    NULL,
    (SELECT id FROM afc_east)
),
(
    'New York',
    'Jets',
    'NYJ',
    NULL,
    (SELECT id FROM afc_east)
);

-- Texans, Colts, Jags, Titans

WITH afc_south AS (
    SELECT id
    FROM nfl_divisions
    WHERE name = 'AFC South'
)

INSERT INTO nfl_teams (location, name, abbreviation, logo_url, division_id)
VALUES
(
    'Houston',
    'Texans',
    'HOU',
    NULL,
    (SELECT id FROM afc_south)
),
(
    'Indianapolis',
    'Colts',
    'IND',
    NULL,
    (SELECT id FROM afc_south)
),
(
    'Jacksonville',
    'Jaguars',
    'JAX',
    NULL,
    (SELECT id FROM afc_south)
),
(
    'Tennessee',
    'Titans',
    'TEN',
    NULL,
    (SELECT id FROM afc_south)
);

-- Broncos, Chiefs, Raiders, Chargers

WITH afc_west AS (
    SELECT id
    FROM nfl_divisions
    WHERE name = 'AFC West'
)

INSERT INTO nfl_teams (location, name, abbreviation, logo_url, division_id)
VALUES
(
    'Denver',
    'Broncos',
    'DEN',
    NULL,
    (SELECT id FROM afc_west)
),
(
    'Kansas City',
    'Chiefs',
    'KAN',
    NULL,
    (SELECT id FROM afc_west)
),
(
    'Las Vegas',
    'Raiders',
    'LVR',
    NULL,
    (SELECT id FROM afc_west)
),
(
    'Los Angeles',
    'Chargers',
    'LAC',
    NULL,
    (SELECT id FROM afc_west)
);

-- Bears, Lions, Packers, Viks

WITH nfc_north AS (
    SELECT id
    FROM nfl_divisions
    WHERE name = 'NFC North'
)

INSERT INTO nfl_teams (location, name, abbreviation, logo_url, division_id)
VALUES
(
    'Chicago',
    'Bears',
    'CHI',
    NULL,
    (SELECT id FROM nfc_north)
),
(
    'Detroit',
    'Lions',
    'DET',
    NULL,
    (SELECT id FROM nfc_north)
),
(
    'Green Bay',
    'Packers',
    'GNB',
    NULL,
    (SELECT id FROM nfc_north)
),
(
    'Minnesota',
    'Vikings',
    'MIN',
    NULL,
    (SELECT id FROM nfc_north)
);

-- Cowboys, Giants, Eagles, Commanders

WITH nfc_east AS (
    SELECT id
    FROM nfl_divisions
    WHERE name = 'NFC East'
)

INSERT INTO nfl_teams (location, name, abbreviation, logo_url, division_id)
VALUES
(
    'Dallas',
    'Cowboys',
    'DAL',
    NULL,
    (SELECT id FROM nfc_east)
),
(
    'New York',
    'Giants',
    'NYG',
    NULL,
    (SELECT id FROM nfc_east)
),
(
    'Philadelphia',
    'Eagles',
    'PHI',
    NULL,
    (SELECT id FROM nfc_east)
),
(
    'Washington',
    'Commanders',
    'WSH',
    NULL,
    (SELECT id FROM nfc_east)
);

-- Falcons, Panthers, Saints, Bucs

WITH nfc_south AS (
    SELECT id
    FROM nfl_divisions
    WHERE name = 'NFC South'
)

INSERT INTO nfl_teams (location, name, abbreviation, logo_url, division_id)
VALUES
(
    'Atlanta',
    'Falcons',
    'ATL',
    NULL,
    (SELECT id FROM nfc_south)
),
(
    'Carolina',
    'Panthers',
    'CAR',
    NULL,
    (SELECT id FROM nfc_south)
),
(
    'New Orleans',
    'Saints',
    'NOR',
    NULL,
    (SELECT id FROM nfc_south)
),
(
    'Tampa Bay',
    'Buccaneers',
    'TAM',
    NULL,
    (SELECT id FROM nfc_south)
);

-- Cards, Rams, 49ers, Seahawks

WITH nfc_west AS (
    SELECT id
    FROM nfl_divisions
    WHERE name = 'NFC West'
)

INSERT INTO nfl_teams (location, name, abbreviation, logo_url, division_id)
VALUES
(
    'Arizona',
    'Cardinals',
    'ARI',
    NULL,
    (SELECT id FROM nfc_west)
),
(
    'Los Angeles',
    'Rams',
    'LAR',
    NULL,
    (SELECT id FROM nfc_west)
),
(
    'San Francisco',
    '49ers',
    'SFO',
    NULL,
    (SELECT id FROM nfc_west)
),
(
    'Seattle',
    'Seahawks',
    'SEA',
    NULL,
    (SELECT id FROM nfc_west)
);

--

SELECT 
    nfl_teams.location,
    nfl_teams.name AS team_name,
    nfl_divisions.name AS division_name,
    nfl_conferences.name AS conference_name
FROM nfl_teams
INNER JOIN nfl_divisions
    ON nfl_teams.division_id = nfl_divisions.id
INNER JOIN nfl_conferences
    ON nfl_divisions.conference_id = nfl_conferences.id
ORDER BY 
    nfl_conferences.name,
    nfl_divisions.name,
    nfl_teams.location,
    nfl_teams.name;



