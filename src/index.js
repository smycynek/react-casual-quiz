/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

export const useCounter = (initial) => {
  const [count, setCount] = useState(initial);
  return [count,
    useCallback(() => setCount((countVal) => countVal + 1)),
    useCallback(() => setCount(() => 0)),
  ];
};

const CasualQuiz = ({
  title, questions, results, showSource,
}) => {
  const [questionIndex, incrementIndex, resetIndex] = useCounter(0);

  // maintains count of answer indicies ({1:5} = five "B" answers)
  const [answers, setAnswers] = useState({});

  // Validates props in more detail -- making sure questions
  // have the same number of choices and match the number of
  // result objects
  const validateInput = () => {
    const firstChoiceLength = questions[0].Choices.length;
    const allEqual = questions.every((q) => q.Choices.length === firstChoiceLength);
    if (!allEqual) {
      throw new Error('All questions must have the same number of choices.');
    }
    if (firstChoiceLength !== results.length) {
      throw new Error('The number of choices per question must equal the number of result objects.');
    }
  };

  useEffect(() => {
    validateInput();
  }, []);

  /// Looks at the answers object and determines the result index
  /// corresponding to what is displayed at the end of the quiz
  const getWinnerIndex = () => {
    const keys = Object.keys(answers);
    const max = Math.max(...Object.values(answers));
    const index = keys.findIndex((key) => answers[key] === max);
    return keys[index];
  };

  // Gets choice index from selected list item text
  const getIndexValueFromChoice = (str) => {
    const choices = questions[questionIndex].Choices;
    const choiceIndex = choices.findIndex((c) => c === str);
    return choiceIndex.toString();
  };

  const getQuestion = () => {
    if (questionIndex >= questions.length) {
      return null;
    }
    return questions[questionIndex];
  };

  // We add a slight delay so the user can
  // See the radio button animation
  const onItemClickHandler = (choice) => {
    setTimeout(() => {
      const indexValue = getIndexValueFromChoice(choice);
      setAnswers((prevAnswers) => {
        // Build an object of answer-index -> count
        // pairs with each question answered
        const prevAnswersCopy = {};
        Object.assign(prevAnswersCopy, prevAnswers);
        if (prevAnswersCopy[indexValue] === undefined) {
          prevAnswersCopy[indexValue] = 1;
        } else {
          prevAnswersCopy[indexValue] = Number(prevAnswersCopy[indexValue]) + 1;
        }
        return prevAnswersCopy;
      });
      incrementIndex(questionIndex + 1);
    }, 300);
  };

  const handleReset = () => {
    resetIndex();
    setAnswers({});
  };

  const listChoices = (question) => ((question === null) ? <li>None</li>
    : question.Choices.map((choice) => (
      <li style={{ fontSize: 'larger' }} key={`choice${Math.random().toString().substring(2)}`}>
        <label>
          <input onChange={() => onItemClickHandler(choice)} className="slim" type="radio" value={choice} />
          {choice}
        </label>
      </li>
    )));

  let result = results[0];
  if (questionIndex > questions.length - 1) {
    result = results[getWinnerIndex()];
  }

  return (

    <div className="App">

      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" rel="stylesheet" />

      <h1 className="text-primary">{title}</h1>
      { questionIndex < questions.length && (
      <h4 className="text-secondary">Take this quiz to find out!</h4>)}
      { questionIndex < questions.length && (
      <p>
        {questionIndex + 1}
        {' '}
        of
        {' '}
        {questions.length}
      </p>
      )}

      { getQuestion()
   && (
   <React.Fragment>
     <p className="text-info" style={{ fontSize: '1.3em' }}>
       {' '}
       {getQuestion().Question}
     </p>
     <ol style={{ listStyle: 'none' }}>
       {listChoices(getQuestion())}
     </ol>
   </React.Fragment>
   )}

      {(questionIndex > questions.length - 1
      && (
      <React.Fragment>
        <h3 className="text-info">
          {result.description}
        </h3>
        <h3 className="text-secondary">
          You are definitely
          {' '}
          {result.name}
          .
          <div>
            <img width="200px" src={result.image} alt={result.name} />

          </div>
        </h3>
        <button className="btn btn-primary" onClick={handleReset} type="button">Try Again</button>
      </React.Fragment>
      )
      )}
      { questionIndex > questions.length - 1 && showSource && (
      <React.Fragment>
        <hr />
        <small><a href="https://github.com/smycynek/react-casual-quiz">https://github.com/smycynek/react-casual-quiz</a></small>
      </React.Fragment>
      )}
    </div>

  );
};

CasualQuiz.propTypes = {
  title: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
  results: PropTypes.array.isRequired,
  showSource: PropTypes.bool,
};

CasualQuiz.defaultProps = {
  showSource: false,
};

export default CasualQuiz;
