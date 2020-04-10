//Vars for the html elements
var titleScreen = document.querySelector(".titleScreen");
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
var initalButton = document.querySelector(".initalButton");

var highScoreListDisplay = document.querySelector(".highScoreList");

//Vars for the counters
var totalTime = 500;
var currentTime = 0;

var score = 0;
var index = 0;

var quizFinished = false;

//Array of objects for the questions
var questions = [
    q1 = {question: "Test question 1. A is correct.", answers: ["a", "b", "c", "d"], correct: 0}
    //q2 = {question: "Test question 2. A is correct.", answers: ["a", "b", "c", "d"], correct: 0},
    //q3 = {question: "Test question 3. A is correct.", answers: ["a", "b", "c", "d"], correct: 0},
    //q4 = {question: "Test question 4. A is correct.", answers: ["a", "b", "c", "d"], correct: 0},
    //q5 = {question: "Test question 5. A is correct.", answers: ["a", "b", "c", "d"], correct: 0},
    //q6 = {question: "Test question 6. A is correct.", answers: ["a", "b", "c", "d"], correct: 0},
    //q7 = {question: "Test question 7. A is correct.", answers: ["a", "b", "c", "d"], correct: 0},
    //q8 = {question: "Test question 8. A is correct.", answers: ["a", "b", "c", "d"], correct: 0},
    //q9 = {question: "Test question 9. A is correct.", answers: ["a", "b", "c", "d"], correct: 0},
    //q10 = {question: "Test question 10. A is correct.", answers: ["a", "b", "c", "d"], correct: 0}
];

//Event listeners
startButton.addEventListener("click", startGame);
answerContainer.addEventListener("click", checkAnswer);
initalButton.addEventListener("click", submitInitials);

function startGame()
{
    console.log("Button press registered");
    titleScreen.classList.add("invisible");
    quizScreen.classList.remove("invisible");
    updateQuestion();
    quizTimer();
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
    document.querySelector(".questionOne").textContent = currentQuestion.answers[0];
    document.querySelector(".questionTwo").textContent = currentQuestion.answers[1];
    document.querySelector(".questionThree").textContent = currentQuestion.answers[2];
    document.querySelector(".questionFour").textContent = currentQuestion.answers[3];
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

function checkAnswer()
{
    event.preventDefault();
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
        timerDisplay.textContent = totalTime-currentTime;
    }
    index++;
    updateQuestion();
}

function endQuiz()
{
    quizScreen.classList.add("invisible");
    endgameScreen.classList.remove("invisible");
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
    //Get the initals before changing the screen
    var initals = initalField.value;
    if(initals === "")
    {
        alert("Please enter your initals.");
        return;
    }

    //Display management
    endgameScreen.classList.add("invisible");
    scoreScreen.classList.remove("invisible");

    //Retrieve the locally stored high score list
    var highScoreList = JSON.parse(localStorage.getItem("highScoreList"));
    if(highScoreList === null)
    {
        highScoreList = [];
    }
    
    //This creates a new object with the player's initals and score, adds it to the highScoreList array, and then sorts the array by score, with the highest score being first.
    var initalWithScore = {name: initals, score: score};
    highScoreList.push(initalWithScore);
    highScoreList = highScoreList.sort(function(a,b){
        return b-a;
    });

    //Creates HTML elements and appends them as children to the score display
    for(var i=0; i<highScoreList.length; i++)
    {
        var newElement = document.createElement("li");
        newElement.textContent = highScoreList[i].name + ": " + highScoreList.score;
        highScoreListDisplay.appendChild(newElement);
    }

    //Saves the new high score list to local storage
    localStorage.setItem("highScoreList",JSON.stringify(highScoreList));
}