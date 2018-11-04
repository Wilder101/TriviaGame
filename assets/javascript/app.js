// TriviaGame by WBM, 10/28/18, app.js file

$(document).ready(function() {

    // Variables
    let questionNumber = 0;             // Tracker for which question game is on
    let numberOfCorrectAnswers = 0;     // Counter for player's number of correct answers
    let numberOfWrongAnswers = 0;       // Counter for player's number of wrong
    let timeRemaining = 30;             // Count down time remaining in question selection

    // Game state
    let startUp = true;
    let playGame = false;
    let startOver = false;

    // Array of trivia questions
    var questionDB = [
        {question: "What is the closest star to our own sun?",  
        answers: ["Alpha Centauri", "Proxima Centauri", "Bernards Star", "Ross 248"],
        correctAnswer: 1},

        {question: "What is the name for meteoroids that survive entry through the atmosphere and reach Earth’s surface?",  
        answers: ["Meteorites", "Meteoroids", "Meteors", "Perseids"],
        correctAnswer: 0},

        {question: "Which U.S. President made the first telephone call to the moon?",  
        answers: ["John F. Kennedy", "Lyndon B. Johnson", "Richard Nixon", "Ronald Regan"],
        correctAnswer: 2},

        {question: "In our solar system, which planet has the shortest day?",  
        answers: ["Mercury", "Earth", "Neptune", "Jupiter"],
        correctAnswer: 3},

        {question: "What is the farthest human-made object from planet Earth?",  
        answers: ["Voyager 1", "Voyager 2", "Pioneer 10", "Hubble Space Telescope"],
        correctAnswer: 0},
        
        {question: "SpaceX was founded by what South African-born inventor?",  
        answers: ["Charlize Theron", "Elon Musk", "Nelson Mandela", "Allan Cormack"],
        correctAnswer: 1}
    ];

    // Show a question
    function showQuestion(whichQuestion) {

        // Build a question and dynamically display
        var theQuestion = $("<h3>");
        theQuestion.addClass("p-3");
        theQuestion.attr("id", "the-question");
        theQuestion.text(questionDB[whichQuestion].question);
        $("#content").append(theQuestion);
    };

    // Show a trivia button set
    function showPossibleAnswers(whichQuestion) {

        // Create answer buttons and dynamically display
        for (let i = 0; i < questionDB[0].answers.length; i++) {
            var answerButton = $("<button>");
            answerButton.addClass("btn btn-lg btn-light answer-button");
            // answerButton.attr("id", "answer-button");
            answerButton.attr("type", "button");
            answerButton.attr("data-value", i);
            answerButton.text(questionDB[whichQuestion].answers[i]);
            $("#content").append(answerButton);
        }

        // Handle answer selection once answer buttons are generated
        $(".answer-button").on("click", function() {

            // Local variable for button's data-value
            var whichAnswerSelected = $(this).attr("data-value");
            // console.log(whichAnswerSelected);
            // console.log(questionDB[questionNumber].correctAnswer);

            // Check for winning round
            if (whichAnswerSelected == questionDB[questionNumber].correctAnswer) {

                // Update score tracking
                numberOfCorrectAnswers++;

                // Clear all content and show time remaining
                $("#content").empty();
                showTimeRemaining();

                // Just show Correct!
                var correctDisplay = $("<h2>").addClass("p-1");
                correctDisplay.text("Correct!");
                $("#content").append(correctDisplay);
                // INCLUDE IMAGE LATER
            }
            // Otherwise guess was a miss
            else {

                // Update score tracking
                numberOfWrongAnswers++;

                // Clear all content and show time remaining
                $("#content").empty();
                showTimeRemaining();

                // Show incorrect
                let incorrectDisplay = $("<h2>").addClass("p-1");
                incorrectDisplay.html("Incorrect.");

                // Add the correct answer
                let theAnswerWas = $("<h3>").addClass("p-1");
                let correctIndex = questionDB[questionNumber].correctAnswer;
                theAnswerWas.html("The correct answer was: <br>" + questionDB[questionNumber].answers[correctIndex]);
                incorrectDisplay.append(theAnswerWas);

                $("#content").append(incorrectDisplay);
                // INCLUDE IMAGE LATER
            }

            // Update game state to next question or end game
            updateGameState();

        }); // End handle answer selection on click event
    } // End of showPossibleAnswers function

    // Update game state to advance question or end game 
    function updateGameState() {

        // Update game state to next question
        questionNumber++;

        // Check for end of game
        if ( questionNumber >= questionDB.length - 1) {
            
            // End of game;show results
            // On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).
            $("#content").empty();                  // Clear content

            // Show number of correct and incorrect answers
            let showScoreResults = $("<h2>").addClass("p-1");
            showScoreResults.html("Thank you for playing. <br><br>");
            showScoreResults.append("Correct answers: " + numberOfCorrectAnswers + "<br>");
            showScoreResults.append("Incorrect answers: " + numberOfWrongAnswers);
            $("#content").append(showScoreResults);
            
            // Restart game and button
            let restartButton = $("<button>");
            restartButton.addClass("btn btn-lg btn-light");
            restartButton.attr("type", "button");
            restartButton.attr("id", "restart-button");
            restartButton.text("Restart");
            $("#content").append("<br><br><br>");
            $("#content").append(restartButton);

            // Restart the game event listener
            $("#restart-button").on("click", function() {

                // Reset game variables
                questionNumber = 0;             // Tracker for which question game is on
                numberOfCorrectAnswers = 0;     // Counter for player's number of correct answers
                numberOfWrongAnswers = 0;       // Counter for player's number of wrong
                timeRemaining = 30;             // Count down time remaining in question selection

                // Clear all content
                $("#content").empty();

                // Show time remaining
                showTimeRemaining();

                // Display first question
                showQuestion(questionNumber);

                // Show answer set
                showPossibleAnswers(questionNumber);

            }); // End start start button on click event

        }
        // Game is to continue -- BE SURE TO INCLUDE A DELAY TIMER IF GAME IS TO CONTINUE, FIRST 
        else {
            $("#content").empty();                  // Clear content
            showTimeRemaining();                    // Show time remaining
            showQuestion(questionNumber);           // Display next question
            showPossibleAnswers(questionNumber);    // Show answer set
        }
    }; // End of updateGameState function

    // On page load -- generate and show start button
    var startButton = $("<button>");
    startButton.addClass("btn btn-lg btn-light");
    startButton.attr("type", "button");
    startButton.attr("id", "start-button");
    startButton.text("Start");
    $("#content").append("<br><br><br>");
    $("#content").append(startButton);

    // Start the game event
    $("#start-button").on("click", function() {

        // Clear all content
        $("#content").empty();

        // Show time remaining
        showTimeRemaining();

        // Display first question
        showQuestion(questionNumber);

        // Show answer set
        showPossibleAnswers(questionNumber);

    }); // End start start button on click event

    // Show time remaining function
    function showTimeRemaining() {

        var timeDisplay = $("<h2>");
        timeDisplay.addClass("p-1");
        timeDisplay.html("Time Remaining: <span id='time-remaining'></span> Seconds");
        $("#content").append(timeDisplay);
        $("#content").append("<hr></hr>");
        $("#time-remaining").text(timeRemaining);
    }; // End ShowTimeRemaining function


}); // End document.ready