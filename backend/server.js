require("dotenv").config();

const cors = require("cors");
const express = require("express");
const app = express();
const router = require("./routers/auth-router");
const connectdb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const PORT = process.env.PORT;
const corsOptions = {
  origin: "exp://192.168.0.109:8081",
  methods: "GET,POST", // Allow only specific HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allow only specific headers
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/", router);

connectdb().then(() => {
  app.listen(PORT, (req, res) => {
    console.log("server is running on port no ", PORT);
  });
});
app.use(errorMiddleware);
