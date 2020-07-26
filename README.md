# react-casual-quiz
A simple quiz react component

Just supply questions, scoring results, and images.

Live demo at https://stevenvictor.net/quiz

## Usage

npm -i react-casual-quiz

## usage - props

```javascript

import someImportedImage1 from './image1.jpg';
import someImportedImage2 from './image2.jpg';

const title = "What is your personality?";

const results = [
  {
    name: 'You are a type "q" personality...',
    description: 'You are strong, thoughtful, and insightful...',
    image: someImportedImage1,
  },
  {
    name: 'You are a type "z" personality...',
    description: 'You are skilled, zany, and creative...',
    image: someImportedImage2,
  },
];

// Result count must equal choice count, and all questions
// must have the same number of choices.

const questions = [
  {
    question: "What do you like to do for fun?",
    choices: ["video games", "draw"]
  },
];

```

## usage - component

```javascript
import CasualQuiz from 'react-casual-quiz/lib';

  <CasualQuiz
      title={title}
      results={results}
      questions={questions}
      showSource
    />
```

https://www.npmjs.com/package/react-casual-quiz

https://github.com/smycynek/react-casual-quiz

See https://github.com/smycynek/quiz for full example.
