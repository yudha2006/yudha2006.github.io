require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

// Koneksi MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// Model Transaksi
const Transaction = require("./models/Transaction");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Routes
app.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.render("index", { transactions });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.post("/add-transaction", async (req, res) => {
  const { buyerName, items } = req.body;

  // Hitung total harga
  let total = 0;
  const parsedItems = JSON.parse(items);
  parsedItems.forEach((item) => {
    total += item.price * item.quantity;
  });

  // Simpan transaksi ke database
  try {
    const newTransaction = new Transaction({
      buyerName,
      items: parsedItems,
      total,
    });
    await newTransaction.save();
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});