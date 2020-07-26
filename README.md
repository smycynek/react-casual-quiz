# react-casual-quiz
A simple quiz react component

Just supply questions, scoring results, and images.

Live demo at https://stevenvictor.net/quiz

## Usage

npm -i react-casual-quiz

```html
  <CasualQuiz
      class="App"
      title={title}
      results={results}
      questions={questions}
      showSource
    />
```

```javascript
props:

title : "Some title"

results :[
{
    name: 'result 1',
    description: 'result 1 description',
    image: someImporteImage1,
}
,
...
]

questions: {
  [
    {
    question: "question1",
    choices: ["choice1", "choice2", ...]
    },
    ...
  ]
}
```

See https://github.com/smycynek/quiz for more usage details

https://www.npmjs.com/package/react-casual-quiz
