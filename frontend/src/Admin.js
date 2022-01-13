import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Admin = () => {
  const url = "http://localhost:8080/words";
  const [words, updateWords] = useState([]);
  const [newEnglishWord, setNewEnglishWord] = useState([]);
  const [newFinnishWord, setNewFinnishWord] = useState([]);

  const save = () => {
    var wordInfo = {
      english_word: newEnglishWord,
      finnish_word: newFinnishWord,
    };

    fetch("http://localhost:8080/words/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(wordInfo),
    });

    getWords();
  };

  const getWords = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => updateWords(data));
  };

  useEffect(() => {
    getWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [true]);

  const deleteTodo = (id) => {
    axios.delete(url + "/" + id).then(getWords());
  };

  return (
    <>
      <div className="addWord">
        <h5>Add a word pair to the excercise here</h5>
        <div className="addWordInputs">
          <input
            type="text"
            className="inputField"
            placeholder="Type english word here"
            onChange={(obj) => setNewEnglishWord(obj.target.value)}
          />

          <input
            type="text"
            className="inputField"
            placeholder="Type finnish word here"
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
                onClick={deleteTodo.bind(this, wordValues.id)}
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
