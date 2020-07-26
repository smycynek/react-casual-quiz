# react-casual-quiz
A simple quiz react component

Just supply questions, scoring results, and images.

Live demo at https://stevenvictor.net/quiz

## Usage

npm -i react-casual-quiz

```html
  <CasualQuiz
      class="App"
      title="your quiz title"
      results={results}
      questions={questions}
      showSource
    />
```

## props

```javascript

const title = "Some title";

const results = [
  {
    name: 'You are a type "q" personality...',
    description: 'you are strong, thoughtful, and insightful...',
    image: someImportedImage1,
  },
  ...
];

// Result count must equal choice count, and all questions
// must have the same number of choices.

const questions = [
  {
    question: "What do you like to do for fun?",
    choices: ["video games", "draw", ... ]
  },
  ...
];

```

See https://github.com/smycynek/quiz for more usage details

https://www.npmjs.com/package/react-casual-quiz
