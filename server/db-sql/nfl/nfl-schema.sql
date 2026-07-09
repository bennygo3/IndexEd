DROP TABLE IF EXISTS nfl_teams;
DROP TABLE IF EXISTS nfl_divisions;
DROP TABLE IF EXISTS nfl_conferences;

CREATE TABLE nfl_conferences (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE nfl_divisions (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    conference_id INTEGER NOT NULL,
    CONSTRAINT fk_nfl_division_conference
        FOREIGN KEY (conference_id)
        REFERENCES nfl_conferences(id)
        ON DELETE RESTRICT
);

CREATE TABLE nfl_teams (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    location VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    abbreviation CHAR(3) NOT NULL UNIQUE,
    logo_url TEXT,
    division_id INTEGER NOT NULL,

    CONSTRAINT uk_nfl_team_name
        UNIQUE (location, name),

    CONSTRAINT fk_nfl_team_division
        FOREIGN KEY (division_id)
        REFERENCES nfl_divisions(id)
        ON DELETE RESTRICT
);
