const getProdCollectionsToEndOfWeek = require("./getProdCollectionToEndOfWeek");

function getSumCollectionToEndOfWeek(
    productsData,
    collectionsTable,
    statusTable,
    stocksData
) {
    for (let stockElement of stocksData) {
        let collectionsToEndOfWeek = getProdCollectionsToEndOfWeek(
            productsData,
            collectionsTable,
            statusTable,
            stockElement.id
        );
        stockElement.collections_to_end_of_week = collectionsToEndOfWeek;
    }

    return stocksData;
}

module.exports = getSumCollectionToEndOfWeek;
