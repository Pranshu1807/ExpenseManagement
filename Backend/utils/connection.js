const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected");
  } catch (e) {
    console.log(`${e}`.bgRed);
  }
};

module.exports = connectDb;
