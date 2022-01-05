const mysql = require("mysql");
require("dotenv").config();

const pool = mysql.createConnection({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});

let connection_functions = {
  connect: () => {
    pool.connect();
  },
  close: () => {
    pool.end();
  },

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
};

module.exports = connection_functions;
