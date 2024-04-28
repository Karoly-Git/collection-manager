import React from "react";
import "../../styles/CollectionsLayout.css";

function CollectionsLayout({ collections, customers, products }) {
    let currentDay = null;

    const getDayOfWeek = (dateString) => {
        const daysOfWeek = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        return daysOfWeek[new Date(dateString).getDay()];
    };

    return (
        <div className="container">
            <h1>Collections</h1>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Product Name</th>
                        <th>Customer Name</th>
                        <th>Reference number</th>
                    </tr>
                </thead>
                <tbody>
                    {collections.map((collection, index) => {
                        const {
                            date_of_collection,
                            product_id,
                            customer_id,
                            ref_num,
                        } = collection;

                        const key = `${date_of_collection}_${index}`;

                        const dayOfWeek = getDayOfWeek(date_of_collection);

                        const productName = products.find(
                            (prod) => prod.id === product_id
                        ).product_name;

                        const customerName = customers.find(
                            (cust) => cust.id === customer_id
                        ).name;

                        if (date_of_collection !== currentDay) {
                            currentDay = date_of_collection;
                            return (
                                <React.Fragment key={key}>
                                    <tr className="day-header">
                                        <td colSpan="4">
                                            {dayOfWeek}, {date_of_collection}
                                        </td>
                                    </tr>
                                    <tr key={key}>
                                        <td></td>
                                        <td>{productName}</td>
                                        <td>{customerName}</td>
                                        <td>{ref_num}</td>
                                    </tr>
                                </React.Fragment>
                            );
                        } else {
                            return (
                                <tr key={key}>
                                    <td></td>
                                    <td>{productName}</td>
                                    <td>{customerName}</td>
                                    <td>{ref_num}</td>
                                </tr>
                            );
                        }
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default CollectionsLayout;
