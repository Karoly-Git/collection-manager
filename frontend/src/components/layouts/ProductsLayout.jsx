import React, { useEffect, useState } from "react";
import "../../styles/ProductsLayout.css";

function ProductsLayout({ products }) {
    return (
        <div className="container">
            <h1>Products</h1>
            <br></br>
            <ul className="products-list">
                {products.map((product) => (
                    <li key={product.id} className="product">
                        <h2>
                            {product.id}. &nbsp;
                            {product.product_name}
                            &nbsp;
                            <span className="group-name">
                                {product.material_group_name}
                            </span>
                        </h2>
                        <h4>
                            Daily production: &nbsp;
                            <span>{product.daily_production}</span>
                        </h4>
                        <h4>
                            Bale / collection: &nbsp;
                            <span>{product.bale_per_collection}</span>
                        </h4>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductsLayout;
