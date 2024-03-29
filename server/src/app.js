const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const productRouter = require("./resources/product/product.router");
const categoryRouter = require("./resources/category/category.router");
const userRouter = require("./resources/user/user.router");
const checkoutRouter = require("./resources/checkout/checkout.router")
const path = require('path'); 

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

app.use(
    cookieSession({
      name: "session",
      keys: ["aVeryS3cr3tK3y"],
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "strict",
      httpOnly: true,
      secure: false,
    })
  );

app.use((err, req, res, next) => {
  console.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  console.error(err.stack);
  next(err);
});


// Routers
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/users", userRouter)
app.use("/api/checkout", checkoutRouter)

app.use(express.static(path.join(__dirname, 'client')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

module.exports = { app };
