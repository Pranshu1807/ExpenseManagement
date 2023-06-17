const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDb = require("./utils/connection");
const userRouter = require("./routes/userRoutes");
const transactionRouter = require("./routes/transactioRoutes");
const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/users", userRouter);
app.use("/transactions", transactionRouter);

connectDb();

app.get("/", (req, res) => {
  res.send("Hello from server");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
