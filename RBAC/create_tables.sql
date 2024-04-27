-- Table for products
CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    product_name VARCHAR(30) NOT NULL,
    daily_production REAL NOT NULL,
    bale_per_collection INTEGER NOT NULL,
    material_group_name VARCHAR(15) NOT NULL
);

-- Table for customers
CREATE TABLE customers (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    name_code VARCHAR(3) NOT NULL,
    short_name VARCHAR(15) NOT NULL,
    send_book_to TEXT[],
    send_document_to TEXT[]
);

-- Table for collections
CREATE TABLE collections (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL, -- ref to products.id
    date_of_collection DATE NOT NULL,
    customer_id INTEGER NOT NULL, -- ref to customers.id
    ref_num VARCHAR(30),
    delayed_to DATE,
    cancellation_date DATE,
    weight DECIMAL,
    num_of_bales INTEGER,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- Table for collection statuses
CREATE TABLE time_log (
    collection_id INTEGER PRIMARY KEY, -- ref to collections.id
    check_in_time TIMESTAMP,
    loading_start_time TIMESTAMP,
    loading_finish_time TIMESTAMP,
    check_out_time TIMESTAMP,
    FOREIGN KEY (collection_id) REFERENCES collections(id)
);

-- Table for stock
CREATE TABLE stock (
    product_id INTEGER PRIMARY KEY, -- ref to products.id
    stock INTEGER NOT NULL,
    collections_to_end_of_week INTEGER NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Table for collections allocation
CREATE TABLE collections_split (
    year INTEGER NOT NULL,
    month VARCHAR(10) NOT NULL,
    product_id INTEGER PRIMARY KEY, -- ref to products.id
    customer_ids INTEGER[],
    customer_codes TEXT[],
    split INTEGER[],
    FOREIGN KEY (product_id) REFERENCES products(id)
);



