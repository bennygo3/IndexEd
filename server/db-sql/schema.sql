CREATE TABLE conferences (
    id SERIAL PRIMARY KEY, --generates unique integer for every conference (2)
    name VARCHAR(50) NOT NULL UNIQUE -- varchar50 allows up to 50 chars to be used; not null = every conference must have a name; unique = no conference duplicates allowed

    conference_id INTEGER NOT NULL,

    CONSTRAINT fk_division_conference -- foreign key from divisions to conferences
        FOREIGN KEY (conference_id) -- The value stored in conference_id must already exist
        REFERENCES conferences(id) -- ... in the id column of the conference table. Meaning = a division cannot be assigned to a conference with an unrecognized conference id
);