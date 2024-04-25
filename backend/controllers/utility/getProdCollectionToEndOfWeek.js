function getTodayDate() {
    // Create a new Date object for the current date
    const currentDate = new Date();

    // Get the day, month, and year components of the current date
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed in JavaScript
    const year = currentDate.getFullYear();

    // Format the date in the format "dd/mm/yyyy"
    const formattedDate = `${day}/${month}/${year}`;

    // Return the formatted date
    return formattedDate;
}

function getMondayDate() {
    const currentDate = new Date();
    // Get the current day of the week (0 = Sunday, 6 = Saturday)
    const currentDayOfWeek = currentDate.getDay();

    // Calculate how many days to subtract to get to Monday (0 = Sunday, -6 = Monday, -1 = Saturday)
    const daysToMonday = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;

    // Subtract the calculated days to get Monday's date
    const mondayDate = new Date(currentDate);
    mondayDate.setDate(currentDate.getDate() + daysToMonday);

    return mondayDate;
}

function getFridayDate() {
    const currentDate = new Date();
    // Get the current day of the week (0 = Sunday, 6 = Saturday)
    const currentDayOfWeek = currentDate.getDay();

    // Calculate how many days to add to get to Friday (5 = Friday, currentDayOfWeek gives us the current day index)
    const daysToFriday =
        currentDayOfWeek <= 5 ? 5 - currentDayOfWeek : 12 - currentDayOfWeek;

    // Add the calculated days to get Friday's date
    const fridayDate = new Date(currentDate);
    fridayDate.setDate(currentDate.getDate() + daysToFriday);

    return fridayDate;
}

function getProdCollectionsToEndOfWeek(
    productsData,
    collectionsTable,
    statusTable,
    productId
) {
    let mondayDate = new Date("2024-04-15"); //getMondayDate();
    let fridayDate = new Date("2024-04-19"); //getFridayDate();

    let filteredList = collectionsTable
        // filter by product
        .filter((collection) => {
            let productElemet = productsData.find(
                (product) => product.id === productId
            );
            let productName = productElemet.product_name;
            return collection.product_name === productName;
        })
        .filter(
            // filter by date range, between Monday and Friday of the current week
            (collection) => {
                let date = new Date(
                    collection.delayed_to
                        ? collection.delayed_to
                        : collection.date_of_collection
                );
                return mondayDate <= date && fridayDate >= date;
            }
        )
        .filter(
            // filter cancelled collectons out
            (collection) => {
                return !collection.cancellation_date;
            }
        )
        .filter(
            // filter by status
            (collection) => {
                let todayDate = new Date("2024-04-20");

                let checkOutTime = statusTable.find(
                    (element) => element.collection_id === collection.id
                ).check_out_time;

                let checkInTime = statusTable.find(
                    (element) => element.collection_id === collection.id
                ).check_in_time;

                checkInTime = new Date(checkInTime);

                return checkInTime < todayDate;
            }
        );

    /*filteredCollectionsTable.forEach(e => {
            console.log(e.id, "\t", e.product_name, "\t", e.date_of_collection, "\t", e.delayed_to, "\t", e.cancellation_date);
        });*/

    let collectionsToEndOfWeek = filteredList.length;

    console.log(
        "Prod ID:",
        productId,
        productId < 10 ? " Left:" : "Left:",
        collectionsToEndOfWeek,
        collectionsToEndOfWeek < 10
            ? " " + productsData.find((e) => e.id === productId).product_name
            : productsData.find((e) => e.id === productId).product_name
    );

    return collectionsToEndOfWeek;
}

module.exports = getProdCollectionsToEndOfWeek;
