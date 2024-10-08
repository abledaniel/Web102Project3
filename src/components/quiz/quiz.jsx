import React, { useState } from "react";
import { questions } from "../../assets/questions";
import "./quiz.css";

const Quiz = () => {
  const [index, setIndex] = useState(1); 
  const [flipped, setFlipped] = useState(false);
  const [guess, setGuess] = useState(""); 
  const [feedback, setFeedback] = useState(""); 

  const changeQuestion = (direction = 0, random = false) => {
    setIndex(prevIndex => {
      if (random) return Math.floor(Math.random() * (questions.length - 1)) + 1;

      const newIndex = prevIndex + direction;
      return newIndex >= questions.length ? 1 : newIndex < 1 ? questions.length - 1 : newIndex;
    });

    // Reset states
    setFlipped(false);
    setGuess("");
    setFeedback("");
  };

  const submitGuess = () => {
    setFeedback(questions[index]?.correct?.toLowerCase() === guess.toLowerCase() 
      ? "Correct!! YIPPIE!!" 
      : "Incorrect. AW MAN!");
    setFlipped(true);
  };

  return (
    <div className="quiz">
      <h1>{questions[0]?.title || "Quiz"}</h1>
      <p>{questions[0]?.tagline || "Test your knowledge!"}</p>
      <p>Number of cards: {questions.length - 1}</p>

      <div className="card-container">
        <button className="nav-btn" onClick={() => changeQuestion(-1)}>&lt;</button>
        
        <div className={`card ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
          <div className="front"><h3>{questions[index]?.question}</h3></div>
          <div className="back"><h3>{questions[index]?.correct}</h3></div>
        </div>
        
        <button className="nav-btn" onClick={() => changeQuestion(1)}>&gt;</button>
      </div>

      <div className="guess-container">
        <input
          type="text"
          placeholder="Place your answer here..."
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
        <button className="submit-btn" onClick={submitGuess}>Submit Guess</button>
        <p>{feedback}</p>
      </div>

      <button className="nav-btn" onClick={() => changeQuestion(0, true)}>Shuffle Cards</button>
    </div>
  );
};

export default Quiz;
