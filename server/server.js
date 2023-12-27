const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express()

app.use(
    cors({
        origin: "*",
    })
);


main().catch((err) => console.log(err));

async function main() {
  console.log("Connect to DB & start server");
  mongoose.set("strictQuery", true);
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
  app.listen(process.env.PORT || 3000, () =>
    console.log("Server is running on http://localhost:3000")
  );
}
