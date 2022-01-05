const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const connection = require("./connection_functions");
require("dotenv").config();
express.static("public");

app.use(express.json());

app.use(cors());

app.get("/words", (req, res) => {
  const find = async () => {
    try {
      let words = await connection.findAll();
      res.status(200).send(words);
    } catch (err) {
      res.status(404).send("Error, results not found");
    }
  };
  find();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
