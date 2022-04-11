var stage = document.querySelector("#stage");
var startUpEl = document.createElement("div");
var questionEl = document.createElement("div");
var questionsArr = [
  {
    question: "What is my favorite color?",
    alpha: "green",
    beta: "blue",
    gamma: "yellow",
    delta: "black",
  },
  {
    question: "What is my favorite food?",
    alpha: "tacos",
    beta: "pizza",
    gamma: "ramen",
    delta: "chicken wings",
  },
];

var startUp = function () {
  stage.appendChild(startUpEl);
  startUpEl.setAttribute("id", "start-up");

  var startUpTitleEl = document.createElement("h1");
  startUpTitleEl.textContent = "Coding Quiz Challenge!";
  startUpEl.appendChild(startUpTitleEl);

  var startUpTextEl = document.createElement("p");
  startUpTextEl.textContent =
    "Try to answer the following coding-related questions within one minute. Any incorrect answers will lower your time and final score by ten seconds. Good luck!";
  startUpEl.appendChild(startUpTextEl);

  var startButtonEl = document.createElement("button");
  startButtonEl.textContent = "Start Quiz!";
  startButtonEl.addEventListener("click", startQuiz);
  startUpEl.appendChild(startButtonEl);
};

var startQuiz = function () {
  startUpEl.remove();
  loadQuestion();
};

var loadQuestion = function () {
  stage.appendChild(questionEl);
  questionEl.setAttribute("id", "question-container");

  var questionTitleEl = document.createElement("h3");
  questionTitleEl.textContent = questionsArr[0].question;
  questionEl.appendChild(questionTitleEl);

  var questionAnswersEl = document.createElement("ul");
  questionEl.appendChild(questionAnswersEl);

  // answers creation and addition
  var answerAlphaEl = document.createElement("li");
  var answerBetaEl = document.createElement("li");
  var answerGammaEl = document.createElement("li");
  var answerDeltaEl = document.createElement("li");

  answerAlphaEl.textContent = questionsArr[0].alpha;
  answerBetaEl.textContent = questionsArr[0].beta;
  answerGammaEl.textContent = questionsArr[0].gamma;
  answerDeltaEl.textContent = questionsArr[0].delta;

  questionAnswersEl.appendChild(answerAlphaEl);
  questionAnswersEl.appendChild(answerBetaEl);
  questionAnswersEl.appendChild(answerGammaEl);
  questionAnswersEl.appendChild(answerDeltaEl);
};

startUp();

/*

Array that holds all question objects

Function that loads in starting page element
* Title
* Descriptive text
* Start quiz button that leads to first question 

Start quiz function 
* Deletes starting page
* Loads first question
* Starts timer

Function that loads in a question element

Timer function
* Starts at 90 sections
* Counts down one section at a time while not zero
* If correct answer is selected, run correct answer function
* If incorrect answer is selected, run incorrect answer function
* Continue to next question

Correct answer function
* Highlights answer
* Displays 'Correct!'

Incorrect answer function
* Highlights correct answer and flags incorrect answer
* Penalizes incorrect answers

Function that tracks score in localStorage and displays top scores


*/
