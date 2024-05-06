import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import "../../styles/EditCustomerStyle.css";

export default function EditCustomerLayout() {
    const { customer_id } = useParams();

    const [customer, setCustomer] = useState({});
    const [customerName, setCustomerName] = useState("");
    const [shortName, setShortName] = useState("");
    const [bookingRecipients, setBookingRecipients] = useState([]);
    const [documentRecipients, setDocumentRecipients] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await fetch(`http://localhost:8000/customers/${customer_id}`);

                if (!response.ok) {
                    console.log("Fetch failed with status", response.status);
                    return;
                }

                const customerData = await response.json();

                setCustomer({ ...customerData });
                setCustomerName(customerData.name);
                setShortName(customerData.short_name);
                setBookingRecipients([...customerData.send_book_to]);
                setDocumentRecipients([...customerData.send_document_to]);

                //console.log(JSON.stringify(customerData));
            } catch (error) {
                console.log("Error fetching data:", error.message);
            }
        };
        fetchCustomer();
    }, []);

    const handleNameChange = (e, setStateFunction) => {
        setStateFunction(e.target.value);
    };

    const checkFormInputChanges = (inputIndex) => {
        if (inputIndex === undefined) {
            // Name branch
            const nameFieldValue = document.getElementById('name-input').value;
            const shortNameFieldValue = document.getElementById('short-name-input').value;

            const isNameUnchanged = customer.name === nameFieldValue;
            const isShortNameUnchanged = customer.short_name === shortNameFieldValue;

            setIsDisabled(isNameUnchanged && isShortNameUnchanged);
        } else {
            // Email list branch
            const bookingRecipientValues = [...document.querySelectorAll(".book-recipient")].map(el => el.value);
            const documentRecipientValues = [...document.querySelectorAll(".document-recipient")].map(el => el.value);

            const areBookingRecipientsUnchanged = JSON.stringify(bookingRecipientValues) === JSON.stringify(customer.send_book_to);
            const areDocumentRecipientsUnchanged = JSON.stringify(documentRecipientValues) === JSON.stringify(customer.send_document_to);

            setIsDisabled(areBookingRecipientsUnchanged && areDocumentRecipientsUnchanged);
        }
    };

    const handleRecipientChange = (e, index, recipientsList, setStateFunction) => {
        let newRecipient = [...recipientsList];
        newRecipient[index] = e.target.value;
        setStateFunction(newRecipient);
    };

    const removeRecipient = (index, list, setListFunction) => {
        let toRemove = list[index];
        let newList = list.filter(recipient => recipient !== toRemove);
        setListFunction(newList);
        setIsDisabled(false);
    };

    const addRecipient = (list, setListFunction) => {
        let newList = [...list, "new@email.com"];
        setListFunction(newList);
        setIsDisabled(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape' || e.key === 'Enter') {
            e.target.blur();
        }
    };

    const handleSubmit = (e, id) => {
        e.preventDefault();

        const formData = {
            "customer": {
                "name": customerName.trim(),
                "short_name": shortName.trim(),
                "send_book_to": bookingRecipients.map(element => element.trim()),
                "send_document_to": documentRecipients.map(element => element.trim())
            }
        };

        fetch(`http://localhost:8000/customers/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCustomer(data);
                setCustomerName(data.name);
                setShortName(data.short_name);
                setBookingRecipients(data.send_book_to);
                setDocumentRecipients(data.send_document_to);
                setIsDisabled(true);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className='container'>
            <h1>Customer details (id: {customer_id})</h1>
            <form onSubmit={(e) => handleSubmit(e, customer_id)}>
                <div>
                    <p>
                        <strong>Name:</strong>
                        <input
                            id='name-input'
                            type="text"
                            value={customerName}
                            placeholder='name required'
                            onKeyDown={handleKeyDown}
                            onChange={(e) => {
                                handleNameChange(e, setCustomerName);
                                checkFormInputChanges();
                            }}
                        />
                    </p>

                    <p>
                        <strong>Short name:</strong>
                        <input
                            id='short-name-input'
                            type="text"
                            value={shortName}
                            placeholder='short name required'
                            onKeyDown={handleKeyDown}
                            onChange={(e) => {
                                handleNameChange(e, setShortName);
                                checkFormInputChanges();
                            }}
                        />
                    </p>
                </div>

                <div>
                    <h3>
                        <strong>Booking recipients:</strong>
                        <span
                            className='add-btn'
                            onClick={() => addRecipient(bookingRecipients, setBookingRecipients)}
                        >ADD</span>
                    </h3>
                    <ul>
                        {bookingRecipients.map((recipient, index) => (
                            <li key={"booking-recipients" + index}>
                                <input
                                    className='book-recipient'
                                    type="text"
                                    value={recipient}
                                    placeholder="email required or delete"
                                    onKeyDown={handleKeyDown}
                                    onChange={(e) => {
                                        handleRecipientChange(e, index, bookingRecipients, setBookingRecipients);
                                        checkFormInputChanges(index);
                                    }}
                                />
                                <span
                                    className='delete-btn'
                                    onClick={() => {
                                        removeRecipient(index, bookingRecipients, setBookingRecipients);
                                    }}
                                >DELETE</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3>
                        <strong>Document recipients:</strong>
                        <span
                            className='add-btn'
                            onClick={() => {
                                addRecipient(documentRecipients, setDocumentRecipients)
                            }}
                        >ADD</span>
                    </h3>
                    <ul>
                        {documentRecipients.map((recipient, index) => (
                            <li key={"document-recipients" + index}>
                                <input
                                    className='document-recipient'
                                    type="text"
                                    value={recipient}
                                    placeholder="email required or delete"
                                    onKeyDown={handleKeyDown}
                                    onChange={(e) => {
                                        handleRecipientChange(e, index, documentRecipients, setDocumentRecipients);
                                        checkFormInputChanges(index);
                                    }}
                                />
                                <span
                                    className='delete-btn'
                                    onClick={() => {
                                        removeRecipient(index, documentRecipients, setDocumentRecipients)
                                    }}
                                >DELETE</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <button
                    className={isDisabled ? 'disabled-btn btn' : 'btn'}
                    disabled={isDisabled}
                    onClick={() => console.log('Save btn clicked')}
                >Save</button>

                <div
                    className='btn'
                    onClick={() => {
                        console.log(`${customer_id} ${customerName} (${shortName})`);
                        console.log("Booking recipients:");
                        bookingRecipients.forEach(e => console.log("\t", `"${e}"`));

                        console.log("-----");

                        console.log("Document recipients:");
                        documentRecipients.forEach(e => console.log("\t", `"${e}"`));

                        console.log("");
                    }}
                >Log</div>
            </form>
        </div>
    )
}
