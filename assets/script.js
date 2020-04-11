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
    q1 = {question: "Which British monarch was overthrown in favor of a republic?", answers: ["Charles I", "Charles II", "James I", "Edward VII"], correct: 0},
    q2 = {question: "The Maderistas fought to overthrow the dictator of Mexico, under the very same slogan he had once used. What was it?", answers: ["Viva Mexico!", "Liberty and equality!", "Peace and bread!", "No reelection!"], correct: 3},
    q3 = {question: "In 1870, the French legislature was planning on restoring the Bourbon monarchy. What made them decide to found a republic instead?", answers: ["They didn't have the funds for a coronation.","The Bourbon pretender insisted on removing the French Tricolor flag.", "They were in conflict with the Pope, and the Bourbons were strong catholics.", "They were overthrown by the Parisians."], correct: 1},
    q4 = {question: "Which of the following facts about the Mexican revolutionary Pancho Villa is false?", answers: ["He escaped from prison by recruiting the prison clerk into his revolution, who disguised him as his own lawyer.", "He escaped assassination by diving out the window of his hotel, and hiding under a bridge.", "He and his men inflitrated a fortified city by riding a train on it's regular schedule, sending fake all clear signals to the train office.", "He starred in the first full length Hollywood movie, wearing a costume provided by the film studio in battle."], correct: 0},
    q5 = {question: "Which of the original thirteen states was the last to ratify the US Constitution?", answers: ["Rhode Island", "Maryland", "South Carolina", "New Hampshire"], correct: 0},
    q6 = {question: "Tzar Nicholas II of Russia earned his nickname of 'Bloody Nicholas' by doing what?", answers: ["Ordering his troops to fire on protesters during 'Bloody Sunday'", "Attending a gala at the French embassy after an accident at a festival killed over a thousand people.", "Sponsering the Black Hundered mobs that attacked democratic protesters and Jews.", "Personally leading the Russian army to a bloody defeat in World War One."], correct: 1},
    q7 = {question: "During the American Revolution, the United States was represented not as a Bald Eagle, but with what animal?", answers: ["Turkey", "Moose", "Rattlesnake", "Donkey"], correct: 2},
    q8 = {question: "The Latin American state of Gran Colombia split apart into which countries shortly after winning independence?", answers: ["Colombia, Mexico, and Venezuela", "Colombia, Boliva, and Ecuador", "Colombia, Haiti, and Panama", "Colombia, Venezuela, and Ecuador"], correct: 3},
    q9 = {question: "Which other revolution occured during the French Revolution?", answers: ["Haitian", "Russian", "Italian", "American"], correct: 0},
    q10 = {question: "During the French revolution, which of the following people was guillotined last?", answers: ["Thomas Paine", "Marie Antoinette", "George Danton", "King Louis XVI"], correct: 2}
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
    console.log(score);
    var initalWithScore = {name: initals, highScore: score};
    highScoreList.push(initalWithScore);
    if(highScoreList.length > 1)
    {
        highScoreList = highScoreList.sort(function(a,b){
            return b.highScore-a.highScore;
        });
    }

    //Creates HTML elements and appends them as children to the score display
    for(var i=0; i<highScoreList.length; i++)
    {
        var newElement = document.createElement("li");
        console.log(highScoreList[i].highScore);
        newElement.textContent = highScoreList[i].name + ": " + highScoreList[i].highScore;
        highScoreListDisplay.appendChild(newElement);
    }

    //Saves the new high score list to local storage
    localStorage.setItem("highScoreList",JSON.stringify(highScoreList));
}