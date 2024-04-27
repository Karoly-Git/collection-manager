const fs = require("fs");
const stockData = require("./stock.json");

function writeJSONFile(filePath) {
    let data = [...stockData];
    data[0].stock = data[0].stock === 0 ? 52 : 0;
    data[0].collections_to_end_of_week =
        data[0].collections_to_end_of_week === 0 ? 7 : 0;
    const jsonString = JSON.stringify(data, null, 2);
    fs.writeFile(filePath, jsonString, "utf-8", (err) => {
        if (err) {
            console.error("Error writing JSON file:", err);
            return;
        }
        console.log("JSON file written successfully");
    });
}

writeJSONFile("./stock.json");
