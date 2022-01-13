import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditWord = () => {
  const { id } = useParams();
  const url = "http://localhost:8080/words";
  /** New values of words set by user stores in state*/
  const [englishWord, setEnglishWord] = useState([]);
  const [finnishWord, setFinnishWord] = useState([]);
  const [word, setWord] = useState([]);
  const [message, setMessage] = useState([]);
  /** Get all word pairs from the database*/
  const getWord = () => {
    axios.get(url + "/" + id).then((response) => {
      setWord(response.data);
    });
  };

  useEffect(() => {
    getWord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [true]);

  /** Used to update word in the database, used with 'Update' button */
  const updateWord = () => {
    var wordInfo = {
      english_word: englishWord,
      finnish_word: finnishWord,
    };
    axios.put(url + "/" + id, wordInfo).then(setMessage("Update successful"));
  };
  /**Returns a new screen where user can write new values for words.*/
  return (
    <>
      <h3>Edit task</h3>
      <p id="message">{message}</p>
      <table id="editTask">
        {word.map((wordValues, index) => {
          return (
            <>
              <tr>
                <td>
                  <input
                    type="text"
                    className="inputField"
                    placeholder={wordValues.english_word}
                    onChange={(obj) => setEnglishWord(obj.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    className="inputField"
                    placeholder={wordValues.finnish_word}
                    onChange={(obj) => setFinnishWord(obj.target.value)}
                  />
                </td>
              </tr>
              <button className="updateButton button" onClick={updateWord}>
                Update
              </button>
            </>
          );
        })}
      </table>
    </>
  );
};

export default EditWord;
