import React from "react";
import { Link } from 'react-router-dom'
import "../../styles/CustomersLayout.css";

export default function CustomersLayout({ customers }) {
    const sortedCustomers = customers
        /*.sort((a, b) => a.name.localeCompare(b.name))*/;

    return (
        <div className="container">
            <h1>Customers</h1>
            <br></br>
            <ul className="customer-list">
                {sortedCustomers.map((customer) => (
                    <Link key={customer.id} to={`/customers/${customer.id}`}>
                        <li className="customer">
                            <h2>
                                <span>
                                    {customer.name}
                                </span>
                                <span>
                                    ID: {customer.id}
                                </span>
                            </h2>

                            <br></br>

                            <h4>Bookings to:</h4>
                            <ul>
                                {customer.send_book_to.map((recipient, i) => (
                                    <li key={"book_recipient" + i}>{recipient}</li>
                                ))}
                            </ul>

                            <br></br>

                            <h4>Documents to:</h4>
                            <ul>
                                {customer.send_document_to.map((recipient, i) => (
                                    <li key={"document_recipient" + i}>{recipient}</li>
                                ))}
                            </ul>
                        </li>
                    </Link>
                ))}
            </ul>
        </div >
    );
}

