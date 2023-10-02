CREATE TABLE IF NOT EXISTS
    "opportunities" (
        id SERIAL PRIMARY KEY,
        opportunity_name VARCHAR(255) NOT NULL,
        prospect_name VARCHAR(255) NOT NULL,
        opportunity_address VARCHAR(255),
        pot_rev INTEGER,
        chance_of_winning INTEGER,
        status VARCHAR(255),
        opportunity_win_date DATE,
        start_date DATE,
        end_date DATE,
        created_at TIMESTAMP,
        updated_at TIMESTAMP
    );

