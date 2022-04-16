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

// questions Object array declaration, taken from W3 schools
var questionsArr = [
  {
    question: "What is HTML?",
    alpha: "A language for describing web pages",
    aStatus: "correct",
    beta: "Everything between the start tag and the end tag, including the tags",
    bStatus: "incorrect",
    gamma: "The style that you are applying to a selector",
    gStatus: "incorrect",
    delta: "The way you declare which elements the styles should apply to",
    dStatus: "incorrect",
  },
  {
    question: "Which of these are NOT a CSS selector?",
    alpha: "Class selector",
    aStatus: "incorrect",
    beta: "ID selector",
    bStatus: "incorrect",
    gamma: "Property selector",
    gStatus: "correct",
    delta: "Attribute Selector",
    dStatus: "incorrect",
  },
  {
    question: "What does HTML stand for?",
    alpha: "Hyperlinks and Text Markup Language",
    aStatus: "incorrect",
    beta: "Home Tool Markup Language",
    bStatus: "incorrect",
    gamma: "Hungry Tony's Meatball Lasanga",
    gStatus: "incorrect",
    delta: "Hyper Text Markup Language",
    dStatus: "correct",
  },
  {
    question: "What does CSS stand for?",
    alpha: "Creative Style Sheets",
    aStatus: "incorrect",
    beta: "Cascading Style Sheets",
    bStatus: "correct",
    gamma: "Computer Style Sheets",
    gStatus: "incorrect",
    delta: "Colorful Style Sheets",
    dStatus: "incorrect",
  },
  {
    question: "How can you add a comment in JavaScript?",
    alpha: "//This is a comment in JavaScript",
    aStatus: "correct",
    beta: "**This is a comment in JavaScript**",
    bStatus: "incorrect",
    gamma: "<!--This is a comment in JavaScript-->",
    gStatus: "incorrect",
    delta: "'This is a comment in JavaScript'",
    dStatus: "correct",
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
  startUpEl.className = "row";

  startUpTitleEl.textContent = "Welcome to the Coding Quiz Challenge!";
  startUpTitleEl.className = "display-5 text-primary";
  startUpEl.appendChild(startUpTitleEl);

  startUpTextEl.textContent =
    "Try to answer the following coding-related questions within one minute. Any incorrect answers will lower your time and final score by ten seconds. Good luck!";
  startUpTextEl.className = "lead";
  startUpEl.appendChild(startUpTextEl);

  startButtonEl.textContent = "Start Quiz!";
  startButtonEl.className = "btn btn-primary";
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
    questionEl.className = "row";

    // assign question and append question h3 element
    questionTitleEl.textContent = questionsArr[questionI].question;
    questionTitleEl.className = "display-6 text-primary";
    questionEl.appendChild(questionTitleEl);

    // append ul element
    questionEl.appendChild(questionAnswersEl);
    questionAnswersEl.className =
      "list-unstyled border-bottom border-secondary";

    // enter answers and append li elements
    answerAlphaEl.textContent = questionsArr[questionI].alpha;
    answerBetaEl.textContent = questionsArr[questionI].beta;
    answerGammaEl.textContent = questionsArr[questionI].gamma;
    answerDeltaEl.textContent = questionsArr[questionI].delta;

    answerAlphaEl.className =
      "answer lead border border-secondary rounded my-3 p-2";
    answerBetaEl.className =
      "answer lead border border-secondary rounded my-3 p-2";
    answerGammaEl.className =
      "answer lead border border-secondary rounded my-3 p-2";
    answerDeltaEl.className =
      "answer lead border border-secondary rounded my-3 p-2";

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
    questionResultEl.className = "h2 text-success";
    setTimeout(function () {
      loadQuestion();
    }, 2000);

    questionEl.removeEventListener("click", answerHandler);

    return;
  }
  // else if it incorrect
  else if (
    targetEl.matches(".answer") &&
    targetEl.getAttribute("data-status") === "incorrect"
  ) {
    // show result, subtract 20 seconds, and load next question
    questionResultEl.textContent = "Incorrect!";
    questionResultEl.className = "h2 text-danger";
    quizTime -= 10;
    setTimeout(function () {
      loadQuestion();
    }, 2000);

    questionEl.removeEventListener("click", answerHandler);

    return;
  }
};

var endQuiz = function () {
  // delete question div and call endQuiz elements
  questionEl.remove();
  clearInterval(quizTimeInterval);
  endQuizEl.className = "row";
  stage.appendChild(endQuizEl);

  endQuizTitleEl.textContent = "Finish!";
  endQuizTitleEl.className = "display-6 text-primary";
  endQuizEl.appendChild(endQuizTitleEl);

  endQuizTextEl.textContent =
    "Your final score is " +
    quizTime +
    ". Enter your initials below and submit your final score to the leader board!";
  endQuizTextEl.className = "lead";
  endQuizEl.appendChild(endQuizTextEl);

  endQuizEl.appendChild(submitFormEl);
  submitButtonEl.className = "btn btn-primary";
  submitFormEl.appendChild(submitInputEl);
  submitFormEl.appendChild(submitButtonEl);

  submitInputEl.setAttribute("type", "text");
  submitInputEl.setAttribute("name", "initials");
  submitInputEl.setAttribute("placeholder", "Enter Initials");
  submitInputEl.setAttribute("maxlength", "4");
  submitInputEl.className = "form-control mb-3";

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
  quizScoresTitleEl.textContent = "Recent Scores";
  quizScoresTitleEl.className = "display-6 text-primary";
  quizScoresStartButtonEl.innerHTML = "Start Again";
  quizScoresStartButtonEl.className = "btn btn-primary me-4";
  quizScoresClearButtonEl.innerHTML = "Clear Scores";
  quizScoresClearButtonEl.className = "btn btn-primary";
  quizScoresListEl.className = "list-group list-group-numbered my-3";

  stage.appendChild(quizScoresEl);
  quizScoresEl.appendChild(quizScoresTitleEl);
  quizScoresEl.appendChild(quizScoresListEl);
  quizScoresEl.appendChild(quizScoresFormEl);
  quizScoresEl.appendChild(quizScoresStartButtonEl);
  quizScoresEl.appendChild(quizScoresClearButtonEl);

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
    quizScoreListItemEl.className = "list-group-item";
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
