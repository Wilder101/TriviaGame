// TriviaGame by WBM, 10/28/18, app.js file -- Totally Spacey Trivia

$(document).ready(function() {

    // Variables
    let questionNumber         = 0;     // Tracker for which question game is on
    let numberOfCorrectAnswers = 0;     // Counter for player's number of correct answers
    let numberOfWrongAnswers   = 0;     // Counter for player's number of wrong
    let numberOfUnaswered      = 0;     // Counter for player's number of unanswered questions

    // Array of trivia questions
    var questionDB = [
        {question: "What is the closest star to our own sun?",  
        answers: ["Alpha Centauri", "Proxima Centauri", "Bernards Star", "Ross 248"],
        correctAnswer: 1,
        answerURL: "https://starguyspeaks.files.wordpress.com/2013/09/proxima_2010.gif"},

        {question: "What is the name for meteoroids that survive entry through the atmosphere and reach Earth’s surface?",  
        answers: ["Meteorites", "Meteoroids", "Meteors", "Perseids"],
        correctAnswer: 0,
        answerURL: "https://media.giphy.com/media/l46CvyAn1oBTOZtZK/giphy.gif"},

        {question: "Which U.S. President made the first telephone call to the moon?",  
        answers: ["John F. Kennedy", "Lyndon B. Johnson", "Richard Nixon", "Ronald Regan"],
        correctAnswer: 2,
        answerURL: "https://media1.tenor.com/images/984ed8627caab6db7e95e9f33ce12a10/tenor.gif?itemid=4993141"},

        {question: "In our solar system, which planet has the shortest day?",  
        answers: ["Mercury", "Earth", "Neptune", "Jupiter"],
        correctAnswer: 3,
        answerURL: "https://media.giphy.com/media/QJ6l2A59FQyGY/giphy.gif"},

        {question: "What is the farthest human-made object from planet Earth?",  
        answers: ["Voyager 1", "Voyager 2", "Pioneer 10", "Hubble Space Telescope"],
        correctAnswer: 0,
        answerURL: "https://media.giphy.com/media/lAyX8WqkeonmM/giphy.gif"},

        {question: "SpaceX was founded by what South African-born inventor?",  
        answers: ["Charlize Theron", "Elon Musk", "Nelson Mandela", "Allan Cormack"],
        correctAnswer: 1,
        answerURL: "https://thumbs.gfycat.com/BelatedWindyCentipede-max-1mb.gif"}
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
            answerButton.attr("type", "button");
            answerButton.attr("data-value", i);
            answerButton.text(questionDB[whichQuestion].answers[i]);
            $("#content").append(answerButton);
        }

        // Handle answer selection once answer buttons are generated
        $(".answer-button").on("click", function() {

            // Local variable for button's data-value
            var whichAnswerSelected = $(this).attr("data-value");

            // Stop the timer
            timer.stop();

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
                showAnswerImage();
            }
            // Otherwise guess was a miss
            else {

                // Update score tracking
                numberOfWrongAnswers++;

                // Clear all content and show time remaining
                $("#content").empty();
                showTimeRemaining();

                // Show incorrect
                var incorrectDisplay = $("<h2>").addClass("p-1");
                incorrectDisplay.html("Incorrect.");

                // Add the correct answer
                var theAnswerWas = $("<h3>").addClass("p-1");
                var correctIndex = questionDB[questionNumber].correctAnswer;
                theAnswerWas.html("The correct answer was: <br>" + questionDB[questionNumber].answers[correctIndex]);
                incorrectDisplay.append(theAnswerWas);
                $("#content").append(incorrectDisplay);
                showAnswerImage();
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
        if ( questionNumber >= questionDB.length) {

            // Delay before game finalization -- five seconds
            setTimeout(wrapItUp, 1000 * 5);
            function wrapItUp() {

                // End of game;show results
                // On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).
                $("#content").empty();                  // Clear content

                // Show number of correct and incorrect answers
                let showScoreResults = $("<h2>").addClass("p-1");
                showScoreResults.html("Thank you for playing. <br><br>");
                showScoreResults.append("Correct answers: " + numberOfCorrectAnswers + "<br>");
                showScoreResults.append("Incorrect answers: " + numberOfWrongAnswers + "<br>");
                showScoreResults.append("Unanswered: " + numberOfUnaswered);
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
                    numberOfUnaswered = 0;          // Counter for player's number of unanswered questions

                    // Setup next question
                    setupNextQuestion();

                }); // End start start button on click event
            } // End of wrapItUp function
        } // End check for end of game

        // Game is to continue
        else {

            // Delay before next question -- five seconds
            setTimeout(nextQuestion, 1000 * 5);
            function nextQuestion() {
                setupNextQuestion();
            }
        }
    }; // End of updateGameState function

    // Setup next question function
    function setupNextQuestion() {

        // Clear all content
        $("#content").empty();

        // Show time remaining
        showTimeRemaining();

        // Display first question
        showQuestion(questionNumber);

        // Show answer set
        showPossibleAnswers(questionNumber);

        // Reset and start the timer
        timer.reset();
        timer.start();

    } // End of setup next question function

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

        // Start the timer
        timer.start();
        
    }); // End start start button on click event

    // Show time remaining function
    function showTimeRemaining() {

        var timeDisplay = $("<h2>");
        timeDisplay.addClass("p-1");
        timeDisplay.html("Time Remaining: <span id='time-remaining'></span> Seconds");
        $("#content").append(timeDisplay);
        $("#content").append("<hr></hr>");
        $("#time-remaining").text(timer.time);

    } // End ShowTimeRemaining function

    // Timer object
    var timer = {

        // Timing variables
        time: 30,                   // 30 second timer key-value pair
        intervalID: 0,              // Holds setInterval that runs timer
        clockRunning: false,        // Timer flag for countdown
      
        reset: function() {
          timer.time = 30;                          // Reset to 30 seconds
          $("#time-remaining").text(timer.time);    // Update time remaining display
        },
      
        start: function() {

          //  Use setInterval to start the count here and set the timer to running
          if (!timer.clockRunning) {
            timer.intervalId = setInterval(timer.count, 1 * 1000);
          }
          timer.clockRunning = true;
        },

        stop: function() {

          //  Use clearInterval to stop the count here and set the timer to not be running
          clearInterval(timer.intervalId); 
          timer.clockRunning = false;
        },
      
        count: function() {

            timer.time--;                             //  Decrement time by 1
            $("#time-remaining").text(timer.time);    // Update time remaining display

            // Check to see if timer has expired and display
            if (timer.time === 0) {

                // Stop timer
                timer.stop();

                // Update score tracking
                numberOfUnaswered++;

                // Clear all content and show time remaining
                $("#content").empty();
                showTimeRemaining();

                // Show incorrect
                var outOfTimeDisplay = $("<h2>").addClass("p-1");
                outOfTimeDisplay.html("Out of Time!");

                // Add the correct answer
                var theAnswerWas = $("<h3>").addClass("p-1");
                var correctIndex = questionDB[questionNumber].correctAnswer;
                theAnswerWas.html("The correct answer was: <br>" + questionDB[questionNumber].answers[correctIndex]);
                outOfTimeDisplay.append(theAnswerWas);

                // Add out of time display and answer image
                $("#content").append(outOfTimeDisplay);
                showAnswerImage();
        
                // Update game state to next question or end game
                updateGameState();    

            } // End if check for expired timer
        } // End start.count function
    } // End timer object

    // Show answer image function
    function showAnswerImage() {

        // Create an image element
        var anImage = $("<img>").addClass("p-1");
        anImage.attr("src", questionDB[questionNumber].answerURL);
        var theCorrectAnswer = questionDB[questionNumber].correctAnswer;
        anImage.attr("alt", questionDB[questionNumber].answers[theCorrectAnswer]);
        anImage.prepend("<br>");

        // Add image to content
        $("#content").append($("<br>"));
        $("#content").append(anImage);
    }

}); // End document.ready