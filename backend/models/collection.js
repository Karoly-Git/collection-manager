const pool = require('./database');

const readProducts = async () => {
    return pool.query('SELECT * FROM products')
        .then(result => result.rows)
        .catch(error => {
            throw new Error(`Error fetching products: ${error}`);
        });
};

const addProduct = async (product) => {
    return pool.query('INSERT INTO products (product) VALUES ($1) RETURNING *', [product])
        .then(result => result.rows[0])
        .catch(error => {
            throw new Error(`Error adding product: ${error}`);
        });
};

const updateProduct = async (id, newDescription) => {
    return pool.query('UPDATE products SET description = $1 WHERE product_id = $2 RETURNING *', [newDescription, id])
        .then(result => result.rows[0])
        .catch(error => {
            throw new Error(`Error updating product: ${error}`);
        });
};

const removeProduct = async (id) => {
    return pool.query('DELETE FROM products WHERE product_id = $1', [id])
        .catch(error => {
            throw new Error(`Error deleting product: ${error}`);
        });
};

module.exports = { readProducts, addProduct, updateProduct, removeProduct };
