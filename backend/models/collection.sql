CREATE DATABASE collection;

CREATE TABLE products(
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL ,
    bales_per_collection INTEGER NOT NULL,
    group VARCHAR(15) NOT NULL
);