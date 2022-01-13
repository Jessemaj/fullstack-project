const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const connection = require("./connection_functions");
require("dotenv").config();

/** Middleware to allow the backend use frontend build*/
app.use(express.static("frontend/build"));
/** Middleware to parse requests with JSON */
app.use(express.json());
/** Middleware to allow fetching */
app.use(cors());

/**Used with GET request, returns all word pairs from the database */
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

/**Used with GET request, returns one word pair with the selected id */
app.get("/words/:id([0-9]+)", (req, res) => {
  let id = req.params.id;

  const findWord = async () => {
    try {
      let word = await connection.findById(id);
      res.status(200).send(word);
    } catch (err) {
      res.status(404).send("Error, results not found");
    }
  };
  findWord();
});

/**Used with DELETE request, deletes one word pair with the selected id */
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

/**Used with PUT request, updates values to the item with the selected id */
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

/**Used with POST request, creates a new word pair into the table. */
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
/**Defining the port to use the express */
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
