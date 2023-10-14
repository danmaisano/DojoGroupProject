CREATE TABLE IF NOT EXISTS "opportunity_contact" (
    opportunity_id INTEGER REFERENCES "opportunities"(id),
    contact_id INTEGER REFERENCES "contacts"(id),
    PRIMARY KEY (opportunity_id, contact_id)
);
