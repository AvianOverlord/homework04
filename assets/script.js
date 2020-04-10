//Vars for the html elements
var titleScreen = document.querySelector(".mainScreen");
var quizScreen = document.querySelector(".quizScreen");
var endgameScreen = document.querySelector(".endgameScreen");
var scoreScreen = document.querySelector(".scoreScreen");

var startButton = document.querySelector(".startButton");

var scoreDisplay = document.querySelector(".scoreDisplay");
var timerDisplay = document.querySelector(".timerDisplay");
var questionText = document.querySelector(".questionText");
var answerContainer = document.querySelector(".answerContainer");

var finalScoreDisplay = document.querySelector(".finalScoreDisplay");
var initalField = document.querySelector("#initalField");
var initalButton = document.querySelector("initalButton");

var highScoreList = document.querySelector("highScoreList");

//Vars for the counters
var totalTime = 500;
var currentTime = 0;

var score = 0;
var index = 0;

var quizFinished = false;

//Array of objects for the questions
var questions = [
    q1 = {question: "Test question. A is correct.", answers: ["a", "b", "c", "d"], correct: 0},
    q2 = {}
];

//Event listeners
startButton.addEventListener("click", startGame);
answerContainer.addEventListener("click", checkAnswer);
initalButton.addEventListener("click", submitInitials);

function startGame()
{
    titleScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    updateQuestion();
}

function updateQuestion()
{
    if(index >= questions.length)
    {
        quizFinished = true;
        currentTime = totalTime;
        endQuiz();
        return;
    }
    var currentQuestion = questions[index];
    questionText.textContent = currentQuestion.question;
    currentQuestion.querySelector(".one").textContent = currentQuestion.answers[0];
    currentQuestion.querySelector(".two").textContent = currentQuestion.answers[1];
    currentQuestion.querySelector(".three").textContent = currentQuestion.answers[2];
    currentQuestion.querySelector(".four").textContent = currentQuestion.answers[3];
}

function quizTimer()
{
    currentTime = 0;
    var timerLoop = setInterval(function(){
        currentTime++;
        if(currentTime >= totalTime)
        {
            clearInterval(timerLoop);
            if(!quizFinished)
            {
                endQuiz();
            }            
        }
        timerDisplay.textContent = totalTime-currentTime;
    },1000);
}

checkAnswer()
{
    var chosenAnswer = event.target;
    var answerIndex = parseInt(chosenAnswer.getAttribute("data-number"));
    if(questions[index].correct === answerIndex)
    {
        alert("Correct!");
        score += 10;
    }
    else
    {
        alert("Incorrect.");
        currentTime += 10;
    }
    index++;
    updateQuestion();
}

function endQuiz()
{
    quizScreen.classList.add("hidden");
    endgameScreen.classList.remove("hidden");
    if(quizFinished)
    {
        alert("You made it all the way through!");
    }
    else
    {
        alert("You ran out of time!");
    }
    finalScoreDisplay.textContent = score;
}

function submitInitials()
{
    //Figure this out tomarrow
}