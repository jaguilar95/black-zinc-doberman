// main stage element declaration
var stage = document.querySelector("#stage");

// start up element declaration
var startUpEl = document.createElement("div");

// questions elements declaration
var questionEl = document.createElement("div");
var questionTitleEl = document.createElement("h3");
var questionAnswersEl = document.createElement("ul");
var answerAlphaEl = document.createElement("li");
var answerBetaEl = document.createElement("li");
var answerGammaEl = document.createElement("li");
var answerDeltaEl = document.createElement("li");
var questionResultEl = document.createElement("div");

// timer declarations
var timerEl = document.querySelector("#timer-time");
var quizTime = 60;

// questions Object array declaration
var questionsArr = [
  {
    question: "What is my favorite color?",
    alpha: "green",
    aStatus: "correct",
    beta: "blue",
    bStatus: "incorrect",
    gamma: "yellow",
    gStatus: "incorrect",
    delta: "black",
    dStatus: "incorrect",
  },
  {
    question: "What is my favorite food?",
    alpha: "tacos",
    aStatus: "correct",
    beta: "pizza",
    bStatus: "incorrect",
    gamma: "ramen",
    gStatus: "incorrect",
    delta: "chicken wings",
    dStatus: "incorrect",
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
  // remove start up element
  startUpEl.remove();

  loadQuestion();
  setInterval(startTimer, 1000);
  questionEl.addEventListener("click", answerHandler);
};

var loadQuestion = function () {
  for (var i = 0; i < questionsArr.length; i++) {
    // append question container
    stage.appendChild(questionEl);
    questionEl.setAttribute("id", "question-container");

    // assign question and append question h3 element
    questionTitleEl.textContent = questionsArr[i].question;
    questionEl.appendChild(questionTitleEl);

    // append ul element
    questionEl.appendChild(questionAnswersEl);

    // enter answers and append li elements
    answerAlphaEl.textContent = questionsArr[i].alpha;
    answerBetaEl.textContent = questionsArr[i].beta;
    answerGammaEl.textContent = questionsArr[i].gamma;
    answerDeltaEl.textContent = questionsArr[i].delta;

    answerAlphaEl.className = "answer";
    answerBetaEl.className = "answer";
    answerGammaEl.className = "answer";
    answerDeltaEl.className = "answer";

    answerAlphaEl.setAttribute("data-status", questionsArr[i].aStatus);
    answerBetaEl.setAttribute("data-status", questionsArr[i].bStatus);
    answerGammaEl.setAttribute("data-status", questionsArr[i].gStatus);
    answerDeltaEl.setAttribute("data-status", questionsArr[i].dStatus);

    questionAnswersEl.appendChild(answerAlphaEl);
    questionAnswersEl.appendChild(answerBetaEl);
    questionAnswersEl.appendChild(answerGammaEl);
    questionAnswersEl.appendChild(answerDeltaEl);

    // append answer result element

    questionResultEl.setAttribute("id", "question-result");
    questionEl.appendChild(questionResultEl);

    break;
  }
};

var startTimer = function () {
  if (quizTime > 0) {
    quizTime -= 1;
    timerEl.innerHTML = "Time Left: " + quizTime;
  } else {
    quizTime = 0;
  }
};

var answerHandler = function (event) {
  // get target element from event
  var targetEl = event.target;

  // an answer element was clicked
  if (
    targetEl.matches(".answer") &&
    targetEl.getAttribute("data-status") === "correct"
  ) {
    // debugger;
    questionResultEl.textContent = "Correct!";
    setTimeout(function () {
      questionEl.remove();
    }, 2000);
    return;
  }
  // else if it incorrect
  else if (
    targetEl.matches(".answer") &&
    targetEl.getAttribute("data-status") === "incorrect"
  ) {
    questionResultEl.textContent = "Incorrect!";
    setTimeout(function () {
      questionEl.remove();
    }, 2000);
    return;
  }
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
