const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
let currentQuestion = {};
let acceptingAnswer = true;
let score = 0 ;
let questionCounter = 0; 
let availableQuestion = [];

let questions = [{}];

// fetching
fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
.then(res => {
  return res.json();
})
.then(loadQuestions => {
  console.log(loadQuestions.results);
  questions = loadQuestions.results.map(loadQuestion => {
    const formattedQuestion = {
      question: loadQuestion.question
  };

  const answerChoices = [...loadQuestion.incorrect_answers];
  formattedQuestion.answer = Math.floor(Math.random()*3) +1;
  answerChoices.splice(formattedQuestion.answer -1, 0, loadQuestion.correct_answer);

  answerChoices.forEach((choice, index) => {
    formattedQuestion["choice" + (index+1)] = choice;
  })
  return formattedQuestion;
  });
  
  startGame();
})
.catch(err => {
  console.error(err);
})

// constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions];
    getNewQuestion();
    // loader
  game.classList.remove("hidden")
  loader.classList.add("hidden")
};
getNewQuestion = () => {
    if(availableQuestion.length === 0 || questionCounter >= MAX_QUESTIONS) {
      localStorage.setItem("mostRecentScore", score);
        // go to end page
        return window.location.assign("/end.html")
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    const questionIndex = Math.floor(Math.random()* availableQuestion.length);
    currentQuestion = availableQuestion[questionIndex];
    question.innerText = currentQuestion.question;
   choices.forEach(choice => {
       const number = choice.dataset["number"];
       choice.innerText = currentQuestion["choice" + number]
   });
   availableQuestion.splice(questionIndex, 1);
   acceptingAnswer = true;
};
choices.forEach(choice => {
    choice.addEventListener("click", e => {
       if (!acceptingAnswer) return;
       acceptingAnswer = false;
       const selectedChoices = e.target;
       const selectedAnswer = selectedChoices.dataset["number"];
       const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        if(classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }
       selectedChoices.parentElement.classList.add(classToApply);
       setTimeout(() => {
              selectedChoices.parentElement.classList.remove(classToApply);
              getNewQuestion();
       }, 1000);
    });
});
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}