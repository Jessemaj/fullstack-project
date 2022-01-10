import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Edit from "./Edit";
//import axios from "axios";

const Excercise = () => {
  const url = "http://localhost:8080/words";
  const [words, updateWords] = useState([]);

  const getWords = () => {
    fetch(url)
      .then((response) => response.json())
      .then((allWords) => updateWords(allWords));
  };

  useEffect(() => {
    getWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [true]);

  return (
    <>
      <table className="excercise">
        {words.map((wordValues, index) => {
          return (
            <tr key={index}>
              <td className="englishWord">{wordValues.english_word}</td>
              <td className="inputField">
                <input type="text" />
              </td>
            </tr>
          );
        })}
        <button id="editButton">
          <Link to={`/edit`}>Edit</Link>
        </button>
      </table>
    </>
  );
};

export default Excercise;
