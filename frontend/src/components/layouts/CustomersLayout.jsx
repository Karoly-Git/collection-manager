import React, { useEffect, useState } from "react";
import "../../styles/CustomersLayout.css";

function CustomersLayout({ customers }) {
    const sortedCustomers = customers
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="container">
            <h1>Customers</h1>
            <br></br>
            <ul className="customer-list">
                {sortedCustomers.map((customer) => (
                    <li key={customer.id} className="customer">
                        <h2>{customer.name}</h2>
                        <br></br>
                        <h4>Bookings to:</h4>
                        <p>{customer.send_book_to.join(", ")}</p>
                        <br></br>
                        <h4>Documents to:</h4>
                        <p>{customer.send_document_to.join(", ")}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CustomersLayout;
