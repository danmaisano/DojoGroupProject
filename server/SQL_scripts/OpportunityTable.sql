CREATE TABLE IF NOT EXISTS
    "opportunities" (
        id SERIAL PRIMARY KEY,
        opportunity_name VARCHAR(255) NOT NULL,
        prospect_name VARCHAR(255) NOT NULL,
        pot_rev INTEGER,
        chance_of_winning INTEGER,
        status VARCHAR(255),
        company_id INTEGER REFERENCES "companies"(id),
        created_at TIMESTAMP,
        updated_at TIMESTAMP
    );

