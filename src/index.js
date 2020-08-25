/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-filename-extension */
import React, {
  useState, useEffect, useDebugValue, useReducer,
} from 'react';
import PropTypes from 'prop-types';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

export const useCounter = (initial) => {
  const [count, setCount] = useState(initial);
  useDebugValue(count ? 'In progress' : 'Reset/Initial');
  return [count,
    () => setCount((countVal) => countVal + 1),
    () => setCount(() => 0),
  ];
};

const CasualQuiz = ({
  name, questions, results, showSource,
}) => {
  const [questionIndex, incrementIndex, resetIndex] = useCounter(0);
  const initialState = {};
  // eslint-disable-next-line no-return-assign
  [...Array(results.length).keys()].forEach((i) => initialState[i] = 0);
  const answerReducer = (answers, { type, payload }) => {
    switch (type) {
      case 'addAnswer':
        // eslint-disable-next-line no-case-declarations
        const retval = { ...answers };
        retval[payload] = answers[payload] + 1;
        return retval;
      case 'reset':
        return initialState;
      default:
        throw new Error();
    }
  };

  // maintains count of answer indicies ({1:5} = five "B" answers)
  const [answers, dispatch] = useReducer(answerReducer, initialState);
  // Validates props in more detail -- making sure questions
  // have the same number of choices and match the number of
  // result objects
  const validateInput = () => {
    const firstChoiceLength = questions[0].choices.length;
    const allEqual = questions.every((q) => q.choices.length === firstChoiceLength);
    if (!allEqual) {
      throw new Error('All questions must have the same number of choices.');
    }
    if (firstChoiceLength !== results.length) {
      throw new Error('The number of choices per question must equal the number of result objects.');
    }
  };

  useEffect(() => {
    validateInput();
    // eslint-disable-next-line
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
    const questionChoices = questions[questionIndex].choices;
    const choiceIndex = questionChoices.findIndex((c) => c === str);
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
      dispatch({ type: 'addAnswer', payload: indexValue });
      incrementIndex(questionIndex + 1);
    }, 300);
  };

  const handleReset = () => {
    resetIndex();
    dispatch({ type: 'reset' });
  };

  const listChoices = (question) => ((question === null) ? <li>None</li>
    : question.choices.map((choice) => (
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

      <h1 className="text-primary">{name}</h1>
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
       {getQuestion().text}
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
  name: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
  results: PropTypes.array.isRequired,
  showSource: PropTypes.bool,
};

CasualQuiz.defaultProps = {
  showSource: false,
};

export default CasualQuiz;
