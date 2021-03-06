const mysql = require("mysql");
require("dotenv").config();

/**Connection pool and options to create the database connection */
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});

/**Connection functions declared */
let connection_functions = {
  connect: () => {
    pool.connect();
  },
  close: () => {
    pool.end();
  },

  /**Select all rows and items from the words table */
  findAll: () => {
    function promFunction(resolve, reject) {
      pool.query("SELECT * FROM words;", (err, words) => {
        if (err) {
          reject(err);
        } else {
          resolve(words);
        }
      });
    }

    let p = new Promise(promFunction);
    return p;
  },
  /**Select one row by an id, returns only one id */
  findById: (id) => {
    function promFunction(resolve, reject) {
      pool.query("SELECT * FROM words WHERE id = " + id, (err, word) => {
        if (err) {
          reject(err);
        } else {
          resolve(word);
        }
      });
    }

    let p = new Promise(promFunction);
    return p;
  },
  /**Delete one row from table by id */
  deleteById: (id) => {
    function promFunction(resolve, reject) {
      pool.query("DELETE FROM words WHERE id = " + id, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Deleted a word successfully ");
        }
      });
    }
    let p = new Promise(promFunction);
    return p;
  },
  /**Update one row with new values */
  updateById: (id, eng_word, fin_word) => {
    function promFunction(resolve, reject) {
      pool.query(
        "UPDATE words SET english_word = " +
          eng_word +
          ", finnish_word = " +
          fin_word +
          "WHERE id = " +
          id,
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(
              "Word with id = " +
                id +
                " updated to " +
                eng_word +
                "/" +
                fin_word
            );
          }
        }
      );
    }
    let p = new Promise(promFunction);
    return p;
  },
  /**Save new row to the table with two words */
  save: (word) => {
    function promFunction(resolve, reject) {
      pool.query(
        "INSERT INTO words (english_word, finnish_word) VALUES (" + word + ");",
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve("Added a new word successfully");
          }
        }
      );
    }
    let p = new Promise(promFunction);
    return p;
  },
};

module.exports = connection_functions;
