const express = require("express");
const cors = require("cors");
require("express-async-errors");
const usersRouter = require("./routes/users");
const app = express();
const { connectDB } = require("./db/connect");
const { connect } = require("./routes/users");
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(
    "request:",
    req.body,
    `
    ==================================================================================
  `
  );
  next();
});
app.use("/api/v1", usersRouter);

app.get("/", (req, res) => {
  res.send("hello bitch!!");
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("database connected..");
    app.listen(port, () => {
      console.log(`Bees are listening on http://localhost:${port} `);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
