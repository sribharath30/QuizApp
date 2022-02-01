import React, { useState } from "react";
import "./Quiz.css";
import { useEffect } from "react";
import _ from "lodash";

export default function Quiz() {
  var he = require("he");
  const [position, setPosition] = useState(0);
  const [incorrect, setIncorrect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quizdata, setQuizdata] = useState([]);
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    const response = await fetch("https://opentdb.com/api.php?amount=10");
    const data = await response.json();
    setQuizdata(data.results);
    setLoading(false);
  };
  function checkans(event) {
    if (event.target.id === quizdata[position].correct_answer) {
      setPosition(position + 1);
      setIncorrect(false);
    } else {
      setIncorrect(true);
    }
  }
  function shufflearray(array, val) {
    let newArray = [...array];
    newArray.push(val);
    let currentIndex = newArray.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [newArray[currentIndex], newArray[randomIndex]] = [
        newArray[randomIndex],
        newArray[currentIndex],
      ];
    }
    return newArray;
  }
  if (position === quizdata.length && !loading)
    return (
      <div>
        <h1>You have Completed the Quiz</h1>
        <button onClick={() => setPosition(0)}>Reset Quiz</button>
        <button onClick={() => window.location.reload()}>Refresh</button>
      </div>
    );
  return (
    <div className="quiz">
      {loading ? (
        <p>Quiz is loading Please wait</p>
      ) : (
        <div>
          <h1>{he.decode(quizdata[position].question)}</h1>
          {shufflearray(
            quizdata[position].incorrect_answers,
            quizdata[position].correct_answer
          ).map((ans) => {
            return (
              <button key={ans} id={ans} onClick={checkans}>
                {he.decode(ans)}
              </button>
            );
          })}
        </div>
      )}
      {incorrect ? <h4>Sorry, that's not right.</h4> : ""}
    </div>
  );
}
