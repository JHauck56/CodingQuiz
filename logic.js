var currentQuestionIndex = 0;
var time = questions.length * 10;
var timerId;

var numberCorrect = 0;

var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

function startQuiz() {
    // hide start screen
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");
  
    // un-hide questions section
    questionsEl.removeAttribute("class");
  
    // start timer
    timerId = setInterval(clockTick, 1000);
  
    // show starting time
    timerEl.textContent = time;
  
    getQuestion();
  }

function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];

    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;

    choicesEl.innerHTML = "";

  // loop over choices
    currentQuestion.choices.forEach(function(choice, i) {
    // create new button for each choice
    var chosen = document.createElement("button");
    chosen.setAttribute("class", "choice");
    chosen.setAttribute("value", choice);

    chosen.textContent = i + 1 + ". " + choice;

    // attach click event listener to each choice
    chosen.onclick = questionClick;

    // display on the page
    choicesEl.appendChild(chosen);
  });
}

function questionClick() {
    // check if user guessed wrong
    if (this.value !== questions[currentQuestionIndex].answer) {
      // penalize time
      //time -= 20;
  
      if (time < 0) {
        time = 0;
      }
      // display new time on page
      timerEl.textContent = time;
      // play "wrong" sound effect
      feedbackEl.textContent = "Wrong!";
    } else {
      // play "right" sound effect
      feedbackEl.textContent = "Correct!";
      numberCorrect++;
    }
  
    // flash right/wrong feedback on page for half a second
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);
  
    // move to next question
    currentQuestionIndex++;
  
    // check if we've run out of questions
    if (currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
  }
  
  function quizEnd() {
    // stop timer
    clearInterval(timerId);
  
    // show end screen
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");
  
    // show final score
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = numberCorrect;

    finalTimeEl = document.getElementById("final-time");
    finalTimeEl.textContent = time + " seconds";
  
    // hide questions section
    questionsEl.setAttribute("class", "hide");
  }
  
  function clockTick() {
    // update time
    time--;
    timerEl.textContent = time;
  
    // check if user ran out of time
    if (time <= 0) {
      quizEnd();
    }
  }
  
  
  
  // user clicks button to start quiz
  startBtn.onclick = startQuiz;
  
