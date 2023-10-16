CREATE TABLE IF NOT EXISTS
  "contacts" (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      cell_phone VARCHAR(20),
      work_phone VARCHAR(20) NOT NULL,
      email VARCHAR(255) NOT NULL,
      company_id INTEGER REFERENCES "companies"(id),
      company_title VARCHAR(255) NOT NULL,
      notes VARCHAR(255),
      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      user_id INTEGER REFERENCES "users"(id)
  );
