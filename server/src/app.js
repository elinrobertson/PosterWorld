const express = require("express");
const cors = require("cors");
const productRouter = require("./resources/product/product.router");

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

// Loggningsmiddleware för att visa detaljerade felmeddelanden
app.use((err, req, res, next) => {
    console.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    next(err);
});

// Routers
app.use("/api/products", productRouter);

module.exports = { app };
