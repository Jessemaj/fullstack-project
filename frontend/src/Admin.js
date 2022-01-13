import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const url = "http://localhost:8080/words";
  /**Words from fetching words stored in words */
  const [words, updateWords] = useState([]);
  /**New words from user to be saved stored in these states */
  const [newEnglishWord, setNewEnglishWord] = useState([]);
  const [newFinnishWord, setNewFinnishWord] = useState([]);

  /**Save a new word pair to the database, after saving update words, used with 'Save' button*/
  const save = () => {
    axios
      .post(url, {
        english_word: newEnglishWord,
        finnish_word: newFinnishWord,
      })
      .then(() => {
        getWords();
      });
  };
  /** Get all word pairs from the database*/
  const getWords = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => updateWords(data));
  };
  /** When loading the page get words*/
  useEffect(() => {
    getWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [true]);
  /**Delete word from database, used with 'Delete' button */
  const deleteWord = (id) => {
    axios.delete(url + "/" + id).then(getWords());
  };

  /**Returns a list of the words in the database. User can delete and edit them. */
  return (
    <>
      <div className="addWord">
        <h5>Add a word pair to the excercise here</h5>
        <div className="addWordInputs">
          <input
            type="text"
            className="inputField"
            placeholder="Type English word here"
            onChange={(obj) => setNewEnglishWord(obj.target.value)}
          />

          <input
            type="text"
            className="inputField"
            placeholder="Type Finnish word here"
            onChange={(obj) => setNewFinnishWord(obj.target.value)}
          />
        </div>

        <button className="button" onClick={save}>
          Save
        </button>
      </div>

      <h5>List of words in the excercise</h5>
      <table className="adminWordsList">
        {words.map((wordValues, index) => {
          return (
            <tr key={index}>
              <td className="englishWord">{wordValues.english_word}</td>

              <td className="finnishWord">{wordValues.finnish_word}</td>
              <button className="editButton button">
                <Link to={`/${wordValues.id}/editword`}>Edit</Link>
              </button>
              <button
                className="deleteButton button"
                onClick={deleteWord.bind(this, wordValues.id)}
              >
                Delete
              </button>
            </tr>
          );
        })}
      </table>
    </>
  );
};

export default Admin;
