DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS divisions; -- divisions is dropped before conferences because divisions depends on conferences
DROP TABLE IF EXISTS conferences; 

CREATE TABLE conferences (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, --generates unique integer for every conference (2)

    name VARCHAR(50) NOT NULL UNIQUE -- varchar50 allows up to 50 chars to be used; not null = every conference must have a name; unique = no conference duplicates allowed
);

CREATE TABLE divisions (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    name VARCHAR(50) NOT NULL UNIQUE,

    conference_id INTEGER NOT NULL,

    CONSTRAINT fk_division_conference -- foreign key from divisions to conferences
        FOREIGN KEY (conference_id) -- The value stored in conference_id must already exist
        REFERENCES conferences(id) -- ... in the id column of the conference table. Meaning = a division cannot be assigned to a conference with an unrecognized conference id
        ON DELETE RESTRICT 
);

CREATE TABLE teams (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    location VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    abbreviation CHAR(3) NOT NULL UNIQUE,

    logo_url TEXT,

    division_id INTEGER NOT NULL,

    CONSTRAINT uk_team_name
        UNIQUE (location, name),

    CONSTRAINT fk_team_division
        FOREIGN KEY (division_id)
        REFERENCES divisions(id)
        ON DELETE RESTRICT
);