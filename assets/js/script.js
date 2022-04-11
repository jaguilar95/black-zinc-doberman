var stage = document.querySelector("#stage");
var startUpEl = document.createElement("div");

var startUp = function () {
  stage.appendChild(startUpEl);
  startUpEl.setAttribute("id", "start-up");

  var startUpTitleEL = document.createElement("h1");
  startUpTitleEL.textContent = "Coding Quiz Challenge!";
  startUpEl.appendChild(startUpTitleEL);

  var startUpTextEl = document.createElement("p");
  startUpTextEl.textContent =
    "Try to answer the following coding-related questions within one minute. Any incorrect answers will lower your time and final score by ten seconds. Good luck!";
  startUpEl.appendChild(startUpTextEl);

  var startButtonEL = document.createElement("button");
  startButtonEL.textContent = "Start Quiz!";
  startButtonEL.addEventListener("click", startQuiz);
  startUpEl.appendChild(startButtonEL);
};

var startQuiz = function () {
  startUpEl.remove();
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
