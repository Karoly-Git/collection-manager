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

                setCustomer(customerData);
                setCustomerName(customerData.name);
                setShortName(customerData.short_name);
                setBookingRecipients(customerData.send_book_to);
                setDocumentRecipients(customerData.send_document_to);

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

    const checkNameChange = (e, property_name) => {
        let customerObjStr = JSON.stringify(customer);
        let newObjStr = JSON.stringify(
            {
                ...customer,
                [property_name]: e.target.value
            }
        );
        setIsDisabled(newObjStr === customerObjStr);
        //console.log(newObjStr === customerObjStr);
    };

    const handleRecipientChange = (e, index, recipientsList, setStateFunction) => {
        let updatedRecipient = e.target.value;
        recipientsList[index] = updatedRecipient;
        setStateFunction(recipientsList);
        console.log(`"${updatedRecipient}"`);
        console.log(recipientsList);
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

    /*
    const handleFocus = (e, index, list) => {
        e.target.value = `${list[index]}`;
        //e.target.placeholder;
    };

    const handleBlur = (e, index, list, setList) => {
        let newList = [...list];
        newList[index] = e.target.value;
        setList(newList);
    };
    */

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
                <p>
                    <strong>Name:</strong>
                    <input
                        type="text"
                        value={customerName}
                        placeholder='name required'
                        onChange={
                            (e) => {
                                handleNameChange(e, setCustomerName);
                                checkNameChange(e, 'name');
                            }
                        }
                        onKeyDown={handleKeyDown}
                    />
                </p>

                <p>
                    <strong>Short name:</strong>
                    <input
                        type="text"
                        value={shortName}
                        placeholder='short name required'
                        required
                        onChange={
                            (e) => {
                                handleNameChange(e, setShortName);
                                checkNameChange(e, 'short_name');
                            }
                        }
                        onKeyDown={handleKeyDown}
                    />
                </p>

                <div>
                    <h3>
                        <strong>Booking recipients:</strong>
                        <span
                            className='add-btn'
                            onClick={
                                () => {
                                    addRecipient(bookingRecipients, setBookingRecipients);
                                }
                            }
                        >ADD
                        </span>
                    </h3>
                    <ul>
                        {bookingRecipients.map((recipient, index) => (
                            <li key={uuidv4()}>
                                <input
                                    type="text"
                                    placeholder={recipient}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    onChange={
                                        (e) => {
                                            handleRecipientChange(e, index, bookingRecipients, setBookingRecipients);
                                        }
                                    }
                                    onKeyDown={handleKeyDown}
                                />
                                <span
                                    className='delete-btn'
                                    onClick={
                                        () => {
                                            removeRecipient(index, bookingRecipients, setBookingRecipients);
                                        }
                                    }
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
                            onClick={
                                () => {
                                    addRecipient(documentRecipients, setDocumentRecipients)
                                }
                            }
                        >ADD</span>
                    </h3>
                    <ul>
                        {documentRecipients.map((recipient, index) => (
                            <li key={uuidv4()}>
                                <input
                                    type="text"
                                    placeholder={recipient}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    onChange={
                                        (e) => {
                                            handleRecipientChange(e, index, documentRecipients, setDocumentRecipients);
                                        }
                                    }
                                    onKeyDown={handleKeyDown}
                                />
                                <span
                                    className='delete-btn'
                                    onClick={
                                        () => {
                                            removeRecipient(index, documentRecipients, setDocumentRecipients)
                                        }
                                    }
                                >DELETE</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <button
                    className={isDisabled ? 'disabled-btn btn' : 'btn'}
                    disabled={isDisabled}
                    onClick={() => console.log('Save btn clicked')}
                >Save
                </button>
                &nbsp;
                &nbsp;
                &nbsp;
                <div
                    className='btn'
                    onClick={
                        () => {
                            console.log(`${customer_id} ${customerName} (${shortName})`);
                            console.log("Booking recipients:");
                            bookingRecipients.forEach(e => console.log("\t", `"${e}"`));

                            console.log("-----");

                            console.log("Document recipients:");
                            documentRecipients.forEach(e => console.log("\t", `"${e}"`));

                            console.log("");
                        }
                    }
                >Log</div>
            </form>
        </div >
    )
}
