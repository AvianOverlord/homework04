# homework04
Fourth homework for GW bootcamp

HTML:
    Button and Starting text
        -Tag to deactivate them when the quiz starts

    Timer Display
        -Begins Hidden
        -Tag for displaying number

    Quiz Elements
        -Element to display the question
        -Container for four buttons
        -Four Buttons
        -Score display

    Endgame Display
        -Score displayed as a heading
        -Form to enter initals, with submit button
        -Display high score list
        -All elements hidden until further notice

CSS:
    -Center all the elements
    -Have a tag/code for hiding elements
    -Round the uttons
    -Put timer and score equidistant in the two corners
        -Grid maybe?

JS:
    -Outside functions
        -vars for all the needed elements
            -See above
        -vars for the total timer length and current duration remaining
        -Store the quiz data in here
            -Array of objects
            -Represent the questions as objects. Vars are question, answer 1, answer 2, answer 3, answer 4, and correct answer.
            -Answers are an array within the object, correct answer is the index of that answer.

    -Start function: Listens for the start button being pushed
        -.classList.add(hidden) to hide the menu
        -.classList.remove(hidden) to reveal the quiz elements
        -calls the timer function, calls the quiz function

    -Timer function:
        -Repeated version, in order to display the remaining time
        -Fairly simple loop, decrements external counter
        -Timer loop is global, so game end can reference it
            -If this doesn't work, do an empty reference to the loop in global, have this function define it as the new loop
        -Find the timer element in HTML, write count to it
        -Have a timer callback function within this function to display the time
        -If timer hits zero, call ending function, give parameter that records why the game ended

    -Quiz Manager function:
        -for loop through the quiz questions array
        -QUESTION: How to query check answer? and/or how to make a function wait for an event
        -Add score (and update score display)
        -if player gives the wrong answer, decrement timer.
        -When the for loop terminates, call Game End

    -Check Answer function:
        -Listens to the container for the different answers
        -receives the question as a parameter
        -Uses target to see which button was pressed
        -uses findIndexOf to see if this answer is correct
        -return boolean
        -QUESTION: How to make this function talk to quiz manager?

    -Game End function:
        -Terminate the timer loop
        -Toggle the tags for the endgame display
        -Toggle the tags to remove the quiz display

    -Score Input function
        -Listen for the form being submitted
        -Store the score and initals as a var
        -Do the local storage thing
        -Toggle the score screen
