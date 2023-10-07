CREATE TABLE IF NOT EXISTS
    "users" (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        company_id INTEGER REFERENCES "companies"(id),
        role VARCHAR(50) NOT NULL DEFAULT 'user',
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP,
        updated_at TIMESTAMP
    );

INSERT INTO users (first_name, last_name, email, company_id, role, password, created_at, updated_at)
VALUES 

('Dan', 'Maisano', 'danmaisano@gmail.com', 1, 'superAdmin','$2b$10$PLWh8S2wayDeAIdzPQiWVuADvDetx4zOLXrHsZQK1CN89kNWQSPT2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('John', 'Doe', 'john.doe@example.com', 1, 'admin','$2b$10$PLWh8S2wayDeAIdzPQiWVuADvDetx4zOLXrHsZQK1CN89kNWQSPT2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Jane', 'Smith', 'jane.smith@example.com', 1, 'user', '$2b$10$PLWh8S2wayDeAIdzPQiWVuADvDetx4zOLXrHsZQK1CN89kNWQSPT2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Alice', 'Johnson', 'alice.johnson@example.com', 1, 'user','$2b$10$PLWh8S2wayDeAIdzPQiWVuADvDetx4zOLXrHsZQK1CN89kNWQSPT2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Dagny', 'Taggart', 'Dagny.@Taggart.com', 2, 'admin', '$2b$10$PLWh8S2wayDeAIdzPQiWVuADvDetx4zOLXrHsZQK1CN89kNWQSPT2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('John', 'Galt', 'John@Galt.com', 2, 'user', '$2b$10$PLWh8S2wayDeAIdzPQiWVuADvDetx4zOLXrHsZQK1CN89kNWQSPT2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Hank', 'Rearden', 'Hank@Rearden.com', 2, 'user', '$2b$10$PLWh8S2wayDeAIdzPQiWVuADvDetx4zOLXrHsZQK1CN89kNWQSPT2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Bart', 'Simpson', 'Bart@example.com', 3, 'admin', '$2b$10$PLWh8S2wayDeAIdzPQiWVuADvDetx4zOLXrHsZQK1CN89kNWQSPT2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Homer', 'Simpson', 'Homer@example.com', 3, 'user', '$2b$10$PLWh8S2wayDeAIdzPQiWVuADvDetx4zOLXrHsZQK1CN89kNWQSPT2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Lisa', 'Simpson', 'Lisa@example.com', 3, 'user', '$2b$10$PLWh8S2wayDeAIdzPQiWVuADvDetx4zOLXrHsZQK1CN89kNWQSPT2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (email) DO NOTHING;

