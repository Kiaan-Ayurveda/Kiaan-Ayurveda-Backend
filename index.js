const express = require("express");
const assert = require("assert");
const cors = require("cors");
const mongoose = require("mongoose");

const { DB_URL } = require("./config");
const billRoutes = require("./bill_routes");

assert(DB_URL, "DB_URL is required");

mongoose.connect(DB_URL).then(() => {
  console.log("Connected to database");
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({ message: "Welcome to Kiaan Billing API" });
});

app.use("/bills", billRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server started at http://localhost:${process.env.PORT || 8000}`);
});
