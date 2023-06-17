const express = require("express");
const {
  addTransaction,
  getAllTransactions,
  editTransactions,
  deleteTransactions,
} = require("../controllers/transactionController");

const transactionRouter = express.Router();

transactionRouter.post("/add-transaction", addTransaction);
transactionRouter.post("/get-transaction", getAllTransactions);
transactionRouter.post("/edit-transaction", editTransactions);
transactionRouter.post("/delete-transaction", deleteTransactions);

module.exports = transactionRouter;
