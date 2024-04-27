-- Creation of permission roles

-- Read-only roles
CREATE ROLE p_customers_read WITH NOLOGIN;
CREATE ROLE p_products_read WITH NOLOGIN;
CREATE ROLE p_send_book_to_read WITH NOLOGIN;
CREATE ROLE p_send_document_to_read WITH NOLOGIN;

-- Write-access roles
CREATE ROLE p_customers_write WITH NOLOGIN;
CREATE ROLE p_products_write WITH NOLOGIN;
CREATE ROLE p_send_book_to_write WITH NOLOGIN;
CREATE ROLE p_send_document_to_write WITH NOLOGIN;

-- Assign permissions to roles on respective tables

-- Read permissions
GRANT SELECT ON customers TO p_customers_read;
GRANT SELECT ON products TO p_products_read;
GRANT SELECT ON send_book_to TO p_send_book_to_read;
GRANT SELECT ON send_document_to TO p_send_document_to_read;

-- Write permissions
GRANT INSERT, UPDATE, DELETE ON customers TO p_customers_write;
GRANT INSERT, UPDATE, DELETE ON products TO p_products_write;
GRANT INSERT, UPDATE, DELETE ON send_book_to TO p_send_book_to_write;
GRANT INSERT, UPDATE, DELETE ON send_document_to TO p_send_document_to_write;

-- Optional creation of role groups for consolidated access management

-- Group roles
CREATE ROLE g_read_tables WITH NOLOGIN;
CREATE ROLE g_write_tables WITH NOLOGIN;

-- Assign read and write roles to respective groups
-- Read group
GRANT 
    p_customers_read, 
    p_products_read, 
    p_send_book_to_read, 
    p_send_document_to_read 
TO g_read_tables;

-- Write group
GRANT 
    p_customers_write, 
    p_products_write, 
    p_send_book_to_write, 
    p_send_document_to_write 
TO g_write_tables;

-- User account creation with appropriate permissions

CREATE ROLE u_karoly_hornyak WITH LOGIN PASSWORD 'karoly';
CREATE ROLE u_richard_edwards WITH LOGIN PASSWORD 'richard';

-- Grant access to role groups
GRANT g_read_tables TO u_karoly_hornyak, u_richard_edwards;
GRANT g_write_tables TO u_karoly_hornyak;

-- Security measure to revoke default public access from critical tables
REVOKE SELECT ON ALL TABLES IN SCHEMA public FROM PUBLIC;
