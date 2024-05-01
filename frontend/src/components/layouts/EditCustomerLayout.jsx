import React, { useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import "../../styles/EditCustomerStyle.css";

export default function EditCustomerLayout() {
    const customer = {
        "id": 4,
        "name": "Vanden Recycling",
        "short_name": "Vanden",
        "send_book_to": [
            "n.scott@vandenrecycling.com",
            "m.janiak@vandenrecycling.com",
            "j.janiak@vandenrecycling.com",
            "k.janiak@vandenrecycling.com"
        ],
        "send_document_to": [
            "n.scott@vandenrecycling.com",
            "m.janiak@vandenrecycling.com"
        ]
    };

    const [name, setName] = useState(customer.name);
    const [shortName, setShortName] = useState(customer.short_name);
    const [bookTo, setBookTo] = useState(customer.send_book_to);
    const [documentTo, setDocumentTo] = useState(customer.send_document_to);

    const handleChange = (e, setStateFunction) => {
        setStateFunction(e.target.value);
    };

    const removeRecipient = (index, list, setList) => {
        let toRemove = list[index];
        let newList = list.filter(recipient => recipient !== toRemove);
        setList(newList);
    };

    const addRecipient = (e, list, setList) => {
        let newList = [...list, "new@emai"];
        setList(newList);
    };

    const handleFocus = (e, index, list) => {
        e.target.value = `${list[index]}`;
        document.addEventListener('keydown', handleKeyDown);
    };

    const handleBlure = (e, index, list, setList) => {
        let newList = [...list];
        newList[index] = e.target.value;
        setList(newList);
        document.removeEventListener('keydown', handleKeyDown);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            e.target.blur();
        }
    };

    return (
        <div className='container'>
            <h1>Customer's details</h1>
            <form action="#" method='put'>
                <p>
                    <strong>Name:</strong>
                    <input type="text" value={name} onChange={(e) => handleChange(e, setName)} />
                </p>

                <p>
                    <strong>Short name:</strong>
                    <input type="text" value={shortName} onChange={(e) => handleChange(e, setShortName)} />
                </p>

                <p>
                    <h3>
                        <strong>Booking recipients:</strong>
                        <span className='add-btn' onClick={(e) => addRecipient(e, bookTo, setBookTo)}>ADD</span>
                    </h3>
                    <ul>
                        {bookTo.map((email, index) => (
                            <li key={uuidv4()}>
                                <input
                                    type="text"
                                    placeholder={email}
                                    onFocus={(e) => handleFocus(e, index, bookTo)}
                                    onBlur={(e) => { handleBlure(e, index, bookTo, setBookTo) }}
                                />
                                <span className='delete-btn' onClick={() => removeRecipient(index, bookTo, setBookTo)}>DELETE</span>
                            </li>
                        ))}
                    </ul>
                </p>

                <p>
                    <h3>
                        <strong>Document recipients:</strong>
                        <span className='add-btn' onClick={(e) => addRecipient(e, documentTo, setDocumentTo)}>ADD</span>
                    </h3>
                    <ul>
                        {documentTo.map((email, index) => (
                            <li key={uuidv4()}>
                                <input
                                    type="text"
                                    placeholder={email}
                                    onFocus={(e) => handleFocus(e, index, documentTo)}
                                    onBlur={(e) => { handleBlure(e, index, documentTo, setDocumentTo) }}
                                />
                                <span className='delete-btn' onClick={() => removeRecipient(index, documentTo, setDocumentTo)}>DELETE</span>
                            </li>
                        ))}
                    </ul>
                </p>
                <button>Save</button>
                &nbsp;
                &nbsp;
                &nbsp;
                <button onClick={() => {
                    console.log("Booking recipients:");
                    bookTo.forEach(e => console.log("\t", e));

                    console.log(" ");

                    console.log("Document recipients:");
                    documentTo.forEach(e => console.log("\t", e));

                    console.log("--------------------");
                }}>Log</button>
            </form>
        </div >
    )
}
