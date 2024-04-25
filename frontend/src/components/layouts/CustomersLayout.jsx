import React, { useEffect, useState } from 'react';
import '../../styles/CustomersLayout.css';

function CustomersLayout() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch('http://localhost:8000/customers');

                if (!response.ok) {
                    console.log('Fetch failed with status', response.status);
                    return;
                }

                const customers = await response.json();
                setCustomers(customers.sort((a, b) => a.name - b.name));
            } catch (error) {
                console.log('Error fetching collections:', error.message);
            }
        }

        fetchCustomers();
    }, []);

    const sortedCustomers = customers.slice().sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="container">
            <h1>Customers</h1>
            <br></br>
            <ul className="customer-list">
                {sortedCustomers.map(customer => (
                    <li key={customer.id} className="customer">
                        <h2>{customer.name}</h2>
                        <br></br>
                        <h4>Bookings to:</h4>
                        <p>
                            {customer.send_book_to.join(', ')}
                        </p>
                        <br></br>
                        <h4>Documents to:</h4>
                        <p>
                            {customer.send_document_to.join(', ')}
                        </p>
                    </li>
                ))}
            </ul>
        </div >
    );
}

export default CustomersLayout;
