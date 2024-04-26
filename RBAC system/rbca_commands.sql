-- Create groups:
CREATE ROLE p_customers_read WITH NOLOGIN;

-- Grant permissions:
GRANT SELECT ON customers TO p_customers_read;

-- Create users:
CREATE ROLE karoly LOGIN PASSWORD 'karoly';

REVOKE SELECT ON customers FROM PUBLIC;