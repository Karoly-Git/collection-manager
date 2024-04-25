require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;

const cors = require("cors");

const calcRouter = require("./routes/calcRouts");
const collectionRouts = require("./routes/collectionRouts");
const customerRouts = require("./routes/customerRouts");
const productRouts = require("./routes/productRouts");
const statusRouts = require("./routes/statusRouts");
const stockRouts = require("./routes/stockRouts");

app.get("/", (req, res) => {
    res.json({
        app: "Collection Calculator",
        author: "Karoly Hornyak",
    });
});

app.use(cors());
app.use(express.json());

app.use("/calc", calcRouter);
app.use("/collections", collectionRouts);
app.use("/customers", customerRouts);
app.use("/products", productRouts);
app.use("/status", statusRouts);
app.use("/stocks", stockRouts);

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});
