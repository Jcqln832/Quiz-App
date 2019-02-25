'use strict';

const questionBank = [
  { q: "When bored, a ridgeback can be:", 
    opt1: "agressive",
    opt2: "aloof",
    opt3: "mischievous",
    opt4: "hyperactive",
    correct: function() {
      return this.opt3;
    }
  },
  { q: "The AKC recognized the breed in what year?", 
    opt1: "1920",
    opt2: "1950",
    opt3: "1955",
    opt4: "1877",
    correct: function() {
      return this.opt3;
    }
  },
  { q: "Ridgebacks have three standard coat colors. What are they?", 
    opt1: "black, golden, red",
    opt2: "brindle, fawn, brown",
    opt3: "red wheaten, wheaten, light wheaten",
    opt4: "orange, biscuit cream, white",
    correct: function() {
      return this.opt3;
    }
  },
  { q: "The most notable physical feature of this breed is the", 
    opt1: "large athletic stature",
    opt2: "ridge of hair on the back growing in the opposite direction to the rest of the coat",
    opt3: "thick, compact paws",
    opt4: "face-framing rounded-point ears",
    correct: function() {
      return this.opt2;
    }
  },
  { q: "The Ridgeback temperament can be described as:", 
    opt1 : "sensitive, quiet, alert, affectionate, strong-willed",
    opt2 : "noisy, playful, unconcerned",
    opt3: "mellow, observant, curious",
    opt4: "goofy, friendly, distracted",
    correct: function() {
      return this.opt1;
    }
  },
  { q: "Ridgebacks are also known as the", 
    opt1 : "African Royal Hound",
    opt2 : "Curious Monkey Dog",
    opt3: "Zebra Hound",
    opt4: "African Lion Dog",
    correct: function() {
      return this.opt4;
    }
  },
  { q: "Ridgebacks tend to not like which of the following?", 
    opt1 : "grass",
    opt2 : "water",
    opt3: "kibble",
    opt4: "other pets",
    correct: function() {
      return this.opt2;
    }
  },
  { q: "Average adult weight of a Ridgeback is", 
    opt1 : "30-50 lbs",
    opt2 : "65-90 lbs",
    opt3: "85-110 lbs",
    opt4: "40-60 lbs",
    correct: function() {
      return this.opt2;
    }
  },
  { q: "The breed had many jobs in its early days, most notably helping with", 
    opt1: "lion hunting",
    opt2: "vaudeville theatre acts",
    opt3: "herding sheep",
    opt4: "wine tasting",
    correct: function() {
      return this.opt1;
    }
  },
  { q: "Ridgebacks make excellent family companions if", 
    opt1: "sent to summer camp every year",
    opt2: "served water from a fountain",
    opt3: "given bacon treats daily",
    opt4: "trained and socialized early and consistently with positive reinforcement",
    correct: function() {
      return this.opt4;
    }
  }
]

let questionNum = 0;
let correctAnswers = 0;


// ***** Event Listeners *****

// Click Begin Quiz button and the first question is rendered to screen
function beginQuiz() {
  $('body').on("click", ".js-start", function() {
    $('.front-page').html("");
      renderQuestion();
  });
}

// Check the user's submitted answer
function checkAnswer() {
  $('body').on("submit", "form", function(e){
    e.preventDefault();
    const userSelection = $('input[type=radio]:checked').val();
    // console.log(questionBank[questionNum].correct());
    if (userSelection === questionBank[questionNum].correct()) {
      let newContent = generateCorrectFeedback(questionBank[questionNum]);
      $('.front-page').html(newContent);
      correctAnswers ++;
    } else {
      let newContent = generateIncorrectFeedback(questionBank[questionNum]);
      $('.front-page').html(newContent);
    }
  });
}

// Click to return to questions
function continueQuiz() {
// console.log("question number (array index) is" + questionNum);
  $('body').on("click", ".js-next", function(e){
    if(questionNum < 9) {
      $('.front-page').html("");
      // increment quiz question number
      questionNum += 1;
        console.log(" after incrementing, question number is" + questionNum);
        renderQuestion();
    } else {
      completeQuiz();
    }
  });
}

// Click Restart Quiz button triggers showIntro
function restartQuiz() {
  $('body').on("click", ".js-restart", showIntro);
}

// ***** Generate feedback for user clicks *****

function generateQuizQuestion(item) {
  return `<div class="quiz-section"><form>
   <p class="question">${item.q}</p>
   <input type="radio" id="opt1" value="${item.opt1}" name="question1" required>
   <label for="opt1">${item.opt1}</label><br>
   <input type="radio" id="opt2" value="${item.opt2}" name="question1" required>
   <label for="opt2">${item.opt2}</label><br>
   <input type="radio" id="opt3" value="${item.opt3}" name="question1" required>
   <label for="opt3">${item.opt3}</label><br>
   <input type="radio" id="opt4" value="${item.opt4}" name="question1" required>
   <label for="opt4">${item.opt4}</label><br>
   <button class="js-feedback btn-feedback" type="submit">Submit</button>
 </form></div>
 <div class="score">
    <p>Question <span>${questionNum + 1}</span> of 10</p>
    <p><span>${correctAnswers}</span> correct answers</p>
  </div>`;
}

// render question and answer choices
function renderQuestion() {
  let content = generateQuizQuestion(questionBank[questionNum]);
  $('.front-page').html(content);
}


// this function handles what get displayed on screen when the user chooses the right answer
  function generateCorrectFeedback(item){
    console.log('correct works!')
    return `<p><b>That's right!</b> ${item.q} <br><br>
    <em>${item.correct()}</em></p> <br>
    <button class="js-next btn-next" type="button">Next</button>
    <img class="puppy-feedback" src="img/puppy-smart-600.jpg" alt="puppy wearing graduation cap"/>`
  }
// this function handles what get displayed on screen when the user chooses the wrong answer
  function generateIncorrectFeedback(item){
    console.log('incorrect works!');
    return `<p><b>Not quite!</b> ${item.q} <br><br>
    <em>${item.correct()}</em></p> <br>
    <button class="js-next btn-next" type="button">Next</button>
    <img class="puppy-feedback" src="img/puppy-concerned-600.jpg" alt="puppy with concerned look"/>`
  }

// show quiz completed screen 
function completeQuiz(){
  let outroContent = `<section class="front-page">
      <div class="quiz-complete">
        <h1>You've completed the quiz!</h1>
        <h2>You answered ${correctAnswers} out of 10 questions correctly.</h2>
        <p><a href="https://www.akc.org/dog-breeds/rhodesian-ridgeback/">Learn more</a> about Rhodesian Ridgebacks or</p>
        <button class="js-restart" type="button">Restart Quiz</button>
      <div>
    </section>`
  $('.front-page').html(outroContent);
  $('body').addClass("bck-img");
}

// reset quiz
function showIntro(){
  $('body').removeClass("bck-img");
  let introContent = `<section class="front-page">
      <div class="intro-content">
        <h1>How much do you know about the Rhodesian Ridgeback dog breed?</h1>
        <h2>Let's find out!</h2>
        <button class="js-start" type="button">Begin Quiz</button>
      <div>
    </section>`
  $('.front-page').html(introContent);
  setTimeout(fadeIn, 100);
  questionNum = 0;
  correctAnswers = 0;
}

function fadeIn(){
  $(".intro-content").addClass('visible');
}

// run the quiz functions
function handleQuiz() {
  showIntro();
  beginQuiz();
  checkAnswer();
  continueQuiz();
  restartQuiz();
  setTimeout(fadeIn, 100);
}

// when the page loads, call `handleQuiz`
$(handleQuiz);