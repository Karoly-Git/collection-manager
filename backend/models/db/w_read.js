const fs = require("fs");

function readJSONFile(filePath) {
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading JSON file:", err);
            return;
        }
        const jsonData = JSON.parse(data);
        console.log(jsonData);
    });
}

readJSONFile("./stock.json");
