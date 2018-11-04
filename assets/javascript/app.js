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

            var whichAnswerSelected = $(this).attr("data-value");
            console.log(whichAnswerSelected);
            console.log(questionDB[questionNumber].correctAnswer);

            // Check for winning round
            if (whichAnswerSelected == questionDB[questionNumber].correctAnswer) {

                // TESTING
                console.log("IF PASSED");

                // We have a winner of this round
                // BUILD DISPLAY IN #content for: empty(), then show congrats/yes/good guess
                // Clear all content
                $("#content").empty();

                // Show time remaining
                showTimeRemaining();

                // Just show Correct!
                var correctDisplay = $("<h2>").addClass("p-1");
                correctDisplay.html("Correct!");
                $("#content").append(correctDisplay);
                // INCLUDE IMAGE LATER

                // Update game state to next question or end game
                updateGameState();
            }
            // Otherwise guess was a miss
            else {
                // Show user what the correct answer was
                // BUILD DISPLAY IN #content for: empty(), then show what was correct   ---- 34 SECONDS INTO DEMO VIDEO

                // Update game state to next question or end game
                updateGameState();

            }

            // $("#content").append("Answer button selected");

            // TESTING
            // $("#content").empty();

        }); // End handle answer selection on click event
    } // End of showPossibleAnswers function

    function updateGameState() {
        // Update game state to next question
        questionNumber++;

        // Check for end of game
        if ( questionNumber >= questionDB.length - 1) {
            // END OF GAME; SHOW RESULTS
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
        // var timeDisplay = $("<h2>");
        // timeDisplay.addClass("p-1");
        // timeDisplay.html("Time Remaining: <span id='time-remaining'></span> Seconds");
        // $("#content").append(timeDisplay);
        // $("#content").append("<hr></hr>");
        // $("#time-remaining").text(timeRemaining);

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