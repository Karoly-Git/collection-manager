import React from 'react';
import '../styles/CollectionsTable.css';

const CollectionsTable = ({ collections }) => {
    let currentDay = null;

    const getDayOfWeek = (dateString) => {
        const [day, month, year] = dateString.split('/');
        const date = new Date(`${month}/${day}/${year}`);
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return daysOfWeek[date.getDay()];
    };

    return (
        <div className="container">
            <h2>Collections Table</h2>
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
                        const { product_name, date_of_collection, customer_name, ref_num } = collection;
                        const key = `${date_of_collection}_${index}`;
                        const dayOfWeek = getDayOfWeek(date_of_collection);
                        if (date_of_collection !== currentDay) {
                            currentDay = date_of_collection;
                            return (
                                <React.Fragment key={key}>
                                    <tr className="day-header">
                                        <td colSpan="4">{dayOfWeek}, {date_of_collection}</td>
                                    </tr>
                                    <tr key={key}>
                                        <td></td>
                                        <td>{product_name}</td>
                                        <td>{customer_name}</td>
                                        <td>{ref_num}</td>
                                    </tr>
                                </React.Fragment>
                            );
                        } else {
                            return (
                                <tr key={key}>
                                    <td></td>
                                    <td>{product_name}</td>
                                    <td>{customer_name}</td>
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

export default CollectionsTable;
