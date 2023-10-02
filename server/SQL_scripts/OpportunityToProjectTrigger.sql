CREATE OR REPLACE FUNCTION opportunity_to_project()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'won' THEN
    INSERT INTO projects (project_name, company_name, address, start_date, end_date) 
    VALUES (NEW.opportunity_name, NEW.prospect_name, NEW.opportunity_address, NEW.start_date, NEW.end_date);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_trigger
        WHERE tgname = 'opportunity_to_project_trigger'
    ) THEN 
        CREATE TRIGGER opportunity_to_project_trigger
        AFTER UPDATE OF status ON opportunities
        FOR EACH ROW EXECUTE FUNCTION opportunity_to_project();
    END IF;
END $$;
