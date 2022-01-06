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

app.delete("/words/:id([0-9]+)", (req, res) => {
  let id = req.params.id;

  const deleteFromList = async () => {
    try {
      let result = await connection.deleteById(id);
      res.status(204).send(result);
    } catch (err) {
      res.status(404).send(err);
    }
  };

  deleteFromList();
});

app.put("/words/:id([0-9]+)", (req, res) => {
  let id = req.params.id;
  let eng_word = '"' + req.body.english_word + '"';
  let fin_word = '"' + req.body.finnish_word + '"';

  const update = async () => {
    try {
      let result = await connection.updateById(id, eng_word, fin_word);
      res.status(201).send(result);
    } catch (err) {
      res.status(400).send("Error, try again");
    }
  };

  update();
});

app.post("/words", (req, res) => {
  let eng_word = '"' + req.body.english_word + '"';
  let fin_word = '"' + req.body.finnish_word + '"';

  const save = async () => {
    try {
      let result = await connection.save([eng_word + ", " + fin_word]);
      res.status(201).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  };

  save();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
