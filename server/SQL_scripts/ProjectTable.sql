CREATE TABLE IF NOT EXISTS
    "projects" (
        id SERIAL PRIMARY KEY,
        project_name VARCHAR(255) NOT NULL,
        company_name VARCHAR(255) NOT NULL,
        address VARCHAR(255),
        description TEXT,
        start_date DATE,
        progress INTEGER,
        status VARCHAR(255),
        end_date DATE,
        created_at TIMESTAMP,
        updated_at TIMESTAMP
    );

