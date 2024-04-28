import React, { useEffect, useState } from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom";

import fetchData from "./utility/fetchData";
import "./App.css";

import CollectionsLayout from "./components/layouts/CollectionsLayout";
import CustomersLayout from "./components/layouts/CustomersLayout";
import ProductsLayout from "./components/layouts/ProductsLayout";

function App() {
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        const loadData = async (url, setter) => {
            const data = await fetchData(url);
            setter(data);
        };

        loadData("http://localhost:8000/customers", setCustomers);
        loadData("http://localhost:8000/products", setProducts);
        loadData("http://localhost:8000/collections", setCollections);
    }, []);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/">
                <Route element={<h1>Home</h1>} />
                <Route
                    path="collections"
                    element={
                        <CollectionsLayout
                            collections={collections}
                            customers={customers}
                            products={products}
                        />
                    }
                />
                <Route
                    path="customers"
                    element={<CustomersLayout customers={customers} />}
                />
                <Route
                    path="products"
                    element={<ProductsLayout products={products} />}
                />
                <Route path="*" element={<h1>Page Not Found</h1>} />
            </Route>
        )
    );

    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
