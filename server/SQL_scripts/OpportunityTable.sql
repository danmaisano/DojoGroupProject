CREATE TABLE IF NOT EXISTS
    opportunities (
        id SERIAL PRIMARY KEY,
        opportunity_name VARCHAR(255) NOT NULL,
        pot_rev INTEGER,
        chance_of_winning INTEGER,
        status VARCHAR(255),
        company_id INTEGER REFERENCES companies(id),
        user_id INTEGER REFERENCES users(id),
        notes VARCHAR(1000)[],
        contact_id INTEGER REFERENCES contacts(id),
        opportunity_win_date DATE,
        created_at TIMESTAMP,
        updated_at TIMESTAMP
    );
