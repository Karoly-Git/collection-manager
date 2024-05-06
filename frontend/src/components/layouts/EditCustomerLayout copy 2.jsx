import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
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

    const checkNameChange = () => {
        let nameInputValue = document.getElementById('name-input').value;
        let shortNameInputValue = document.getElementById('short-name-input').value;
        let isNameChanged = (customer.name === nameInputValue) && (customer.short_name === shortNameInputValue);
        //console.log(isNameChanged);
        setIsDisabled(isNameChanged);
    };

    const handleRecipientChange = (e, index, recipientsList, setStateFunction) => {
        let updatedRecipient = e.target.value;
        recipientsList[index] = updatedRecipient;
        e.target.placeholder = e.target.value;
        setStateFunction(recipientsList);
    };

    const checkRecipientChange = () => {
        return;
    };


    const removeRecipient = (index, list, setList) => {
        let toRemove = list[index];
        let newList = list.filter(recipient => recipient !== toRemove);
        setList(newList);
        setIsDisabled(false);
    };

    const addRecipient = (list, setList) => {
        let newList = [...list, "new@email.com"];
        setList(newList);
        setIsDisabled(false);
    };

    const handleFocus = (e) => {
        e.target.value = e.target.placeholder;
    };

    const handleBlur = (e) => {
        e.target.placeholder = e.target.value;
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
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

        // Construct the PUT request
        fetch(`http://localhost:8000/customers/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers as needed
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                // Parse response body as JSON
                return response.json();
            })
            .then(data => {
                // Log the responded JSON data
                console.log(data);
                setCustomer(data);
                setCustomerName(data.name);
                setShortName(data.short_name);
                setBookingRecipients(data.send_book_to);
                setDocumentRecipients(data.send_document_to);
                setIsDisabled(true);
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
            });
    };

    return (
        <div className='container'>
            <h1>Customer details (id: {customer_id})</h1>
            <form onSubmit={(e) => handleSubmit(e, customer_id)}>

                <div>
                    <h3>
                        <strong>Booking recipients:</strong>
                        {/*<span
                            className='add-btn'
                            onClick={
                                () => {
                                    addRecipient(bookingRecipients, setBookingRecipients);
                                }
                            }
                        >ADD
                        </span>*/}
                    </h3>
                    <ul>
                        {bookingRecipients.map((recipient, index) => (
                            <li key={uuidv4()}>
                                <input
                                    type="text"
                                    value={recipient}
                                    onChange={
                                        (e) => {
                                            //handleRecipientChange(e, index, bookingRecipients, setBookingRecipients);
                                            //checkRecipientChange();
                                            let newEmails = [...bookingRecipients];
                                            newEmails[index] = e.target.value;
                                            setBookingRecipients(newEmails);
                                            console.log(index, newEmails);
                                        }
                                    }
                                />
                            </li>
                        ))}
                    </ul>
                </div>

                <button onClick={() => console.log('Save btn clicked')}>
                    Save
                </button>
            </form>
        </div >
    )
}
