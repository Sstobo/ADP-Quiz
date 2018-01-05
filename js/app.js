var React = require('react');
var ReactDOM = require('react-dom');
let correctAnswers = 0;
let wrongAnswers = 0;
let answer = 0;
let quizChoice = 0;
let currentQuestion = 0;



$(document).ready(function () {
 

function printScore(correctAnswers, wrongAnswers){
  $(".score").html("<p class='correct' >Correct: " + correctAnswers + "</p></br><p class='incorrect'>Incorrect: " + wrongAnswers + "</p>" );
};

function clearScreen(correctAnswers, wrongAnswers){
  $(".game-over").hide();
  $(".x-wrap").hide();
  $(".check-wrap").hide();
  $('#answers').empty();
  printScore(correctAnswers, wrongAnswers);
};
clearScreen(correctAnswers, wrongAnswers);



  // Select quiz option, move buttons to left
$("#quiz-1").on("click", function(){

    let quizChoice = 0;
    let currentQuestion = 0;

    if ($("#quiz-1").hasClass("selected")) {

      getQuestion(quizChoice, currentQuestion,correctAnswers, wrongAnswers);

    } else if 
      ($("#quiz-1").hasClass("quiz-1-sidebar")) {
        $(this).toggleClass("selected");
        $("#quiz-2").toggleClass("selected");

      getQuestion(quizChoice, currentQuestion,correctAnswers, wrongAnswers);

    } else {
        $(this).toggleClass("quiz-1-sidebar selected");
        $("#quiz-2").toggleClass("quiz-2-sidebar");
    
      getQuestion(quizChoice, currentQuestion,correctAnswers, wrongAnswers);
    }
});

// Select quiz 2 move buttons to the left

$("#quiz-2").on("click", function(){

    let quizChoice = 1;
    let currentQuestion = 0;

    if ($("#quiz-2").hasClass("selected")) {

      getQuestion(quizChoice, currentQuestion,correctAnswers, wrongAnswers);
    
    } else if ($("#quiz-2").hasClass("quiz-2-sidebar")) {
        $(this).toggleClass("selected");
        $("#quiz-1").toggleClass("selected");

      getQuestion(quizChoice, currentQuestion,correctAnswers, wrongAnswers);

    } else {
       $(this).toggleClass("quiz-2-sidebar selected");
       $("#quiz-1").toggleClass("quiz-1-sidebar");

      getQuestion(quizChoice, currentQuestion,correctAnswers, wrongAnswers);
    }
});



function getQuestion(quizChoice, currentQuestion, correctAnswers, wrongAnswers) {
  
  clearScreen(correctAnswers, wrongAnswers);

  $.getJSON('build/quiz.json', function (data) {
  
    let title= data.quizzes[quizChoice].title;
    let question = data.quizzes[quizChoice].questions[currentQuestion].question;

    $('.start').html(title);
    $('.question').html("<div class='new'>"+question+"</div>");

   for ( var i = 0 ; i < 4; i++ ) {

      let answers = data.quizzes[quizChoice].questions[currentQuestion].answers[i].content;

      $('.answers').append("<div>"+answers+" <button class='button' type='button' id="+i+">Select</button></div></br>");
    }

    $(".button").on("click", function () {

     let answerChoice = this.id;

     setTimeout(function (){
     getAnswer(data, answerChoice, quizChoice, currentQuestion, correctAnswers, wrongAnswers);
    }, 1000);
    });
  });
};


function getAnswer(data, answerChoice, quizChoice, currentQuestion,correctAnswers, wrongAnswers){
// get quizchoicelength for i

  for ( var i = 0 ; i < 4; i++ ) {
    if (data.quizzes[quizChoice].questions[currentQuestion].answers[i].value == true) {
      var correctAnswer = i;
    }
    else {
    }
  };

// CORRECT ANSWER

  if (answerChoice == correctAnswer) {
    
      currentQuestion = currentQuestion + 1;
      correctAnswers = correctAnswers + 1;

      clearScreen(correctAnswers, wrongAnswers);

      $(".check-wrap").show();

      setTimeout(function (){
        $(".check-wrap").hide();
       }, 2000);

          
    if (currentQuestion > 2) {
         
      $(".check-wrap").show();
    
      setTimeout(function (){
        gameOver(correctAnswers, wrongAnswers)
      }, 2000);
        

    }
    else {
      setTimeout(function (){
        getQuestion(quizChoice, currentQuestion, correctAnswers, wrongAnswers)
      }, 2000);
    }
  }

// INCORRECT ANSWER

  else if (answerChoice != correctAnswer) {

    currentQuestion = currentQuestion + 1;
    wrongAnswers = wrongAnswers + 1;

    clearScreen(correctAnswers, wrongAnswers);

    $(".x-wrap").show();

    setTimeout(function (){
      $(".x-wrap").hide();
     }, 2000);

// END OF ROUND

    if (currentQuestion > 2) {
   
      $(".x-wrap").show();
    
      setTimeout(function (){
        gameOver(correctAnswers, wrongAnswers)
      }, 2000);
    }

    else {
      setTimeout(function (){
        getQuestion(quizChoice, currentQuestion, correctAnswers, wrongAnswers)
      }, 2000);
    }
  }
  else {
  }
};

// GAME OVER FUNCTION
function gameOver(correctAnswers, wrongAnswers) {
  
  clearScreen(correctAnswers, wrongAnswers);
  
  $('.start').html("");
  $('.question').html("");
  $(".game-over").show();
  
  if (correctAnswers > wrongAnswers) {
    $(".game-over").html("<h1>A winner is you!</h1></br><h3> Final score: "+correctAnswers+":"+wrongAnswers+
    "</h3>");
  }
  else {
    $(".game-over").html("<h1>Sorry, you lose!</h1></br><h3> Final score: "+correctAnswers+":"+wrongAnswers+"</h3>");
  }
}
});

