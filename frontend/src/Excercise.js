import React, { useEffect, useState } from "react";

const Excercise = () => {
  const url = "http://localhost:8080/words";
  const [words, updateWords] = useState([]);
  const [answer] = useState([]);
  const [userScore, setUserScore] = useState(0);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [showInput, setShowInput] = useState(true);

  const getWords = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => updateWords(data));
  };

  useEffect(() => {
    getWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [true]);

  const checkScore = () => {
    let scoreCounter = 0;
    for (let i = 0; i < words.length; i++) {
      if (answer[i] === words[i].finnish_word) {
        scoreCounter += 1;
      }
      setUserScore(scoreCounter);
      setShowCorrectAnswer(true);
      setShowInput(false);
    }
  };

  return (
    <>
      <table className="excercise">
        {words.map((wordValues, index) => {
          return (
            <tr key={index}>
              <td className="englishWord">{wordValues.english_word}</td>

              {showInput ? (
                <td className="inputField">
                  <input
                    type="text"
                    onChange={(obj) => (answer[index] = obj.target.value)}
                  />
                </td>
              ) : null}
              {showCorrectAnswer ? (
                <td className="finnishWord">{wordValues.finnish_word}</td>
              ) : null}
            </tr>
          );
        })}
        <tr>
          <td>
            <p id="score">Score: {userScore}</p>
          </td>
          <td>
            <button id="checkScore" onClick={checkScore}>
              Check score
            </button>
          </td>
        </tr>
      </table>
    </>
  );
};

export default Excercise;
