// main stage element declaration
var stage = document.querySelector("#stage");

// start up element declarations
var startUpEl = document.createElement("div");
var startUpTitleEl = document.createElement("h1");
var startUpTextEl = document.createElement("p");
var startButtonEl = document.createElement("button");

// questions element declarations
var questionEl = document.createElement("div");
var questionTitleEl = document.createElement("h3");
var questionAnswersEl = document.createElement("ul");
var answerAlphaEl = document.createElement("li");
var answerBetaEl = document.createElement("li");
var answerGammaEl = document.createElement("li");
var answerDeltaEl = document.createElement("li");
var questionResultEl = document.createElement("div");
var questionI = 0;

// end quiz element declarations
var endQuizEl = document.createElement("div");
var endQuizTitleEl = document.createElement("h1");
var endQuizTextEl = document.createElement("p");
var submitFormEl = document.createElement("form");
var submitInputEl = document.createElement("input");
var submitButtonEl = document.createElement("button");
let quizTimeInterval;

// quiz scores element declarations
var quizScoresEl = document.createElement("div");
var quizScoresTitleEl = document.createElement("h1");
var quizScoresListEl = document.createElement("ol");
var quizScoresFormEl = document.createElement("form");
var quizScoresStartButtonEl = document.createElement("button");
var quizScoresClearButtonEl = document.createElement("button");

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

var scoresArr = [];

var startUp = function () {
  // remove quiz scores elements if there
  quizScoresEl.remove();

  // reset timer and question iterator
  quizTime = 60;
  timerEl.innerHTML = "Time Left: " + quizTime;
  quizTimeInterval = false;
  questionI = 0;

  // load question
  loadScores();

  // add start up elements
  stage.appendChild(startUpEl);
  startUpEl.setAttribute("id", "start-up");

  startUpTitleEl.textContent = "Coding Quiz Challenge!";
  startUpEl.appendChild(startUpTitleEl);

  startUpTextEl.textContent =
    "Try to answer the following coding-related questions within one minute. Any incorrect answers will lower your time and final score by ten seconds. Good luck!";
  startUpEl.appendChild(startUpTextEl);

  startButtonEl.textContent = "Start Quiz!";
  startButtonEl.addEventListener("click", startQuiz);
  startUpEl.appendChild(startButtonEl);
};

var startQuiz = function () {
  // remove start up element
  startUpEl.remove();

  loadQuestion();
  if (!quizTimeInterval) {
    quizTimeInterval = setInterval(startTimer, 1000);
  }
};

var loadQuestion = function () {
  if (questionI < questionsArr.length) {
    // append question container
    stage.appendChild(questionEl);
    questionEl.setAttribute("id", "question-container");

    // assign question and append question h3 element
    questionTitleEl.textContent = questionsArr[questionI].question;
    questionEl.appendChild(questionTitleEl);

    // append ul element
    questionEl.appendChild(questionAnswersEl);

    // enter answers and append li elements
    answerAlphaEl.textContent = questionsArr[questionI].alpha;
    answerBetaEl.textContent = questionsArr[questionI].beta;
    answerGammaEl.textContent = questionsArr[questionI].gamma;
    answerDeltaEl.textContent = questionsArr[questionI].delta;

    answerAlphaEl.className = "answer";
    answerBetaEl.className = "answer";
    answerGammaEl.className = "answer";
    answerDeltaEl.className = "answer";

    answerAlphaEl.setAttribute("data-status", questionsArr[questionI].aStatus);
    answerBetaEl.setAttribute("data-status", questionsArr[questionI].bStatus);
    answerGammaEl.setAttribute("data-status", questionsArr[questionI].gStatus);
    answerDeltaEl.setAttribute("data-status", questionsArr[questionI].dStatus);

    questionAnswersEl.appendChild(answerAlphaEl);
    questionAnswersEl.appendChild(answerBetaEl);
    questionAnswersEl.appendChild(answerGammaEl);
    questionAnswersEl.appendChild(answerDeltaEl);

    // append answer result element

    questionResultEl.setAttribute("id", "question-result");
    questionResultEl.textContent = "";
    questionEl.appendChild(questionResultEl);

    questionEl.addEventListener("click", answerHandler);
  } else {
    endQuiz();
  }
};

var startTimer = function () {
  if (quizTime > 0) {
    timerEl.innerHTML = "Time Left: " + quizTime;
    quizTime -= 1;
  } else {
    quizTime = 0;
  }
};

var answerHandler = function (event) {
  // get target element from event
  var targetEl = event.target;

  // move to next question
  questionI++;

  // an answer element was clicked
  if (
    targetEl.matches(".answer") &&
    targetEl.getAttribute("data-status") === "correct"
  ) {
    // show result and load next question
    questionResultEl.textContent = "Correct!";
    setTimeout(function () {
      loadQuestion();
    }, 1000);

    return;
  }
  // else if it incorrect
  else if (
    targetEl.matches(".answer") &&
    targetEl.getAttribute("data-status") === "incorrect"
  ) {
    // show result, subtract 20 seconds, and load next question
    questionResultEl.textContent = "Incorrect!";
    quizTime -= 10;
    setTimeout(function () {
      loadQuestion();
    }, 1000);
    return;
  }
};

var endQuiz = function () {
  // delete question div and call endQuiz elements
  questionEl.remove();
  clearInterval(quizTimeInterval);
  stage.appendChild(endQuizEl);

  endQuizTitleEl.textContent = "Finish!";
  endQuizEl.appendChild(endQuizTitleEl);

  endQuizTextEl.textContent =
    "Your final score is " +
    quizTime +
    ". Enter your initials below and submit your final score to the leader board!";
  endQuizEl.appendChild(endQuizTextEl);

  endQuizEl.appendChild(submitFormEl);
  submitFormEl.appendChild(submitInputEl);
  submitFormEl.appendChild(submitButtonEl);

  submitInputEl.setAttribute("type", "text");
  submitInputEl.setAttribute("name", "initials");
  submitInputEl.setAttribute("placeholder", "Enter Initials");
  submitInputEl.setAttribute("maxlength", "4");

  submitButtonEl.innerHTML = "Submit";
  submitFormEl.addEventListener("submit", scoreSubmitHandler);
};

var saveScore = function () {
  localStorage.setItem("scoresArr", JSON.stringify(scoresArr));
};

var loadScores = function () {
  var savedScores = localStorage.getItem("scoresArr");

  if (!savedScores) {
    return false;
  }

  scoresArr = JSON.parse(savedScores);
};

var scoreSubmitHandler = function (event) {
  event.preventDefault();

  var initialsInput = document.querySelector("input[name='initials']").value;
  // check if input values are empty strings
  if (!initialsInput) {
    alert("Please enter your initials!");
    return false;
  }

  // else package it as an object
  else {
    var scoreDataObj = {
      initials: initialsInput,
      score: quizTime,
    };

    scoresArr.push(scoreDataObj);

    // keeping only the last five attempts
    if (scoresArr.length > 5) {
      scoresArr.shift();
    }

    saveScore();
    quizScores();
  }
};

var quizScores = function () {
  // remove endQuiz element and reset initials form
  endQuizEl.remove();
  submitFormEl.reset();

  // load quiz score elements
  stage.appendChild(quizScoresEl);
  quizScoresEl.appendChild(quizScoresTitleEl);
  quizScoresEl.appendChild(quizScoresListEl);
  quizScoresEl.appendChild(quizScoresFormEl);
  quizScoresEl.appendChild(quizScoresStartButtonEl);
  quizScoresEl.appendChild(quizScoresClearButtonEl);

  quizScoresTitleEl.textContent = "Recent Scores";
  quizScoresStartButtonEl.innerHTML = "Start Again";
  quizScoresClearButtonEl.innerHTML = "Clear Scores";

  // adding recent scores as list items
  addScoreList();

  quizScoresStartButtonEl.addEventListener("click", startUp);
  quizScoresClearButtonEl.addEventListener("click", clearScores);
};

var addScoreList = function () {
  removeScoreList();

  // get scores from localStorage
  var savedScores = localStorage.getItem("scoresArr");
  savedScores = JSON.parse(savedScores);

  // add all the tasks to the ol
  for (i = 0; i < scoresArr.length; i++) {
    var quizScoreListItemEl = document.createElement("li");
    quizScoreListItemEl.className = "recentScores";
    quizScoreListItemEl.textContent =
      savedScores[i].initials + " - " + savedScores[i].score;
    quizScoresListEl.appendChild(quizScoreListItemEl);
  }
};

// remove previous lists
var removeScoreList = function () {
  while (quizScoresListEl.firstChild) {
    quizScoresListEl.removeChild(quizScoresListEl.firstChild);
  }
};

var clearScores = function () {
  scoresArr = [];
  saveScore();
  removeScoreList();
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
