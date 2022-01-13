import React, { useEffect, useState } from "react";

const Excercise = () => {
  const url = "http://localhost:8080/words";
  /**All excercise words are stored here */
  const [words, updateWords] = useState([]);
  /**Users answer stored in here */
  const [answer] = useState([]);
  /**users score */
  const [userScore, setUserScore] = useState([]);

  /**These states under are used to show/hide elements after actions */
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [showRetry, setShowRetry] = useState(false);
  const [showCheckScore, setShowCheckScore] = useState(true);

  /**get all words from the database */
  const getWords = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => updateWords(data));
  };

  /** Used to refresh the page, use with 'refresh' button */
  const refreshPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    getWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [true]);

  /**Checks the score, if answer is correct +1 is added to the counter.
   * Also, "  CORRECT!" string is added after the word so the user can see
   * what answers were right
   */
  const checkScore = () => {
    let scoreCounter = 0;
    for (let i = 0; i < words.length; i++) {
      if (answer[i] === words[i].finnish_word) {
        scoreCounter += 1;
        words[i].finnish_word += "  CORRECT!";
      }
      /**After all answers are checked correct answers, retry button and score are showed and
       * input fields are hidden.
       */
      setUserScore("Score: " + scoreCounter);
      setShowCorrectAnswer(true);
      setShowInput(false);
      setShowRetry(true);
      setShowCheckScore(false);
    }
  };

  /** Returns a table where there is a English word and a input field
   * where the user can try to guess the correct word. To check the score
   * There is 'Check score' button to check the score.
   */
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
