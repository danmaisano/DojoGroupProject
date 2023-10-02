CREATE TABLE IF NOT EXISTS
    "project_budgets" (
        id SERIAL PRIMARY KEY,
        task_code VARCHAR(50),
        item_name VARCHAR(255),
        job_code VARCHAR(50),
        phase_code VARCHAR(50),
        category_code VARCHAR(50),
        est_quantity DECIMAL(15, 2),
        est_price DECIMAL(15, 2),
        est_amount DECIMAL(15, 2),
        rev_quantity DECIMAL(15, 2),
        rev_price DECIMAL(15, 2),
        rev_amount DECIMAL(15, 2),
        created_at TIMESTAMP,
        updated_at TIMESTAMP
    );

