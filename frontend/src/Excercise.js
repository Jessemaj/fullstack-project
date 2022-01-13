import React, { useEffect, useState } from "react";

const Excercise = () => {
  const url = "http://localhost:8080/words";
  const [words, updateWords] = useState([]);
  const [answer] = useState([]);
  const [userScore, setUserScore] = useState([]);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [showRetry, setShowRetry] = useState(false);
  const [showCheckScore, setShowCheckScore] = useState(true);

  const getWords = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => updateWords(data));
  };

  const refreshPage = () => {
    window.location.reload();
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
        words[i].finnish_word += "  CORRECT!";
      }
      setUserScore("Score: " + scoreCounter);
      setShowCorrectAnswer(true);
      setShowInput(false);
      setShowRetry(true);
      setShowCheckScore(false);
    }
  };

  return (
    <>
      <h3>Try to get as many words right as you can</h3>
      <table className="excercise">
        {words.map((wordValues, index) => {
          return (
            <tr key={index}>
              <td className="englishWord">{wordValues.english_word}</td>

              {showInput ? (
                <td className="inputField">
                  <input
                    type="text"
                    onChange={(obj) =>
                      (answer[index] = obj.target.value.toLowerCase())
                    }
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
            <p id="score">{userScore}</p>
          </td>
          <td>
            {showCheckScore ? (
              <button className="checkScore button" onClick={checkScore}>
                Check score
              </button>
            ) : null}
            {showRetry ? (
              <button className="retry button" onClick={refreshPage}>
                Retry
              </button>
            ) : null}
          </td>
        </tr>
      </table>
    </>
  );
};

export default Excercise;
