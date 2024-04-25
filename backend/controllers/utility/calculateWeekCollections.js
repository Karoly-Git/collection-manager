const productsData = require("../../models/db/products.json");
const stockData = require("../../models/db/stock.json");
let collectionsPlan = require("../../models/db/collections_plan.json");

let newWeek = {
    id: 2,
    wc: "22/04/2024",
    products_to_book: [],
};

let newSchedule = [];

function calculateWeekCollections(productsData, stockData, remainingDays) {
    for (let product of productsData) {
        let id = product.id;
        let stockElement = stockData.find((element) => element.id === id);
        let productElement = productsData.find((element) => element.id === id);

        let endOfTheWeekStock = getEndOfTheWeekStock(
            stockElement.stock,
            remainingDays,
            product.daily_production,
            product.bale_per_collection,
            stockElement.collections_to_end_of_week
        );

        //console.log(product.id, product.product_name, 'End Of The Week Stock:', endOfTheWeekStock, '/', product.bale_per_collection);

        let wc = "22/04/2024";

        let dayCount = 0;
        while (dayCount < 5) {
            const dayCollections = getDayCollections(
                endOfTheWeekStock,
                productElement.bale_per_collection
            );
            const endOfDayStock = getEndOfDayStock(
                endOfTheWeekStock,
                productElement.daily_production,
                productElement.bale_per_collection
            );
            endOfTheWeekStock = endOfDayStock;

            //console.log('  ', convertToDay(dayCount), dayCollections, '\t\t', 'stock:', endOfTheWeekStock);

            newSchedule.push(dayCollections);

            dayCount++;
        }

        console.log(product.id, product.product_name, newSchedule);

        if (!newSchedule.every((e) => e === 0)) {
            newWeek.products_to_book.push({
                product_id: product.id,
                schedule: newSchedule,
            });
        }

        newSchedule = [];
    }
}

function getEndOfTheWeekStock(
    stock,
    remainingDays,
    dailyProduction,
    balesPerCollection,
    collectionsToEndOfWeek
) {
    const production = dailyProduction * remainingDays;
    const outgoing = balesPerCollection * collectionsToEndOfWeek;
    return Math.floor(stock + production - outgoing);
}

function getEndOfDayStock(openingStock, dailyProduction, balesPerCollection) {
    const dayCollections = getDayCollections(openingStock, balesPerCollection);
    const endOfDayStock =
        openingStock + dailyProduction - dayCollections * balesPerCollection;
    return Math.floor(endOfDayStock);
}

function getDayCollections(openingStock, balesPerCollection) {
    const dayCollection =
        openingStock >= balesPerCollection
            ? openingStock / balesPerCollection
            : 0;
    return Math.floor(dayCollection);
}

function convertToDay(number) {
    let day;
    switch (number) {
        case 0:
            day = "Mon";
            break;
        case 1:
            day = "Tue";
            break;
        case 2:
            day = "Wed";
            break;
        case 3:
            day = "Thu";
            break;
        case 4:
            day = "Fri";
            break;
        default:
            day = "Invalid number";
    }
    return day;
}

calculateWeekCollections(productsData, stockData, 5);
collectionsPlan.push(newWeek);
collectionsPlan.forEach((week) => console.log(week));
