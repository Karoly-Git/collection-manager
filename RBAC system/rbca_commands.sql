CREATE ROLE p_customers_read WITH NOLOGIN;

GRANT SELECT ON customers TO p_customers_read;

-- Create users:
CREATE ROLE karoly LOGIN PASSWORD 'karoly';