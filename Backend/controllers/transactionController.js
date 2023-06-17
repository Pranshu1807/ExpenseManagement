const moment = require("moment/moment");
const transactionModel = require("../models/transactionModel");

const getAllTransactions = async (req, res) => {
  try {
    const { time, type } = req.body;
    const transactions = await transactionModel.find({
      ...(time !== "0" && {
        date: {
          $gt: moment().subtract(Number(time), "d").toDate(),
        },
      }),
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });
    res.status(200).json(transactions);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).json("transaction created");
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

const editTransactions = async (req, res) => {
  try {
    await transactionModel.findOneAndUpdate(
      {
        _id: req.body.transactionId,
      },
      req.body.payload
    );
    res.status(201).json("Edit Succesfull");
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

const deleteTransactions = async (req, res) => {
  try {
    await transactionModel.findOneAndDelete({
      _id: req.body.transactionId,
    });
    res.status(201).json("Transaction Deleted");
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};
module.exports = {
  getAllTransactions,
  addTransaction,
  editTransactions,
  deleteTransactions,
};
