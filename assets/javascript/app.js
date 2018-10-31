// TriviaGame by WBM, 10/28/18, app.js file

$(document).ready(function() {

    // Variables
    questionNumber = 0;             // Tracker for which question game is on


    // Array of trivia questions
    var questionDB = [
        {question: "What time is it?",  
        answers: ["07:00", "12:00", "18:30", "23:59"],
        correctAnswer: 1} 

        // {name: "yellow" , randomHiddenValue: 0}
    ];


    function showQuestion(whichQuestion) {

        // Show a question and possible answers
        $("#the-question").text(questionDB[whichQuestion].question);
        
        $("#btn-top").text(questionDB[whichQuestion].answers[0]);
        $("#btn-middle-top").text(questionDB[whichQuestion].answers[1]);
        $("#btn-middle-bottom").text(questionDB[whichQuestion].answers[2]);
        $("#btn-bottom").text(questionDB[whichQuestion].answers[3]);
    };

    // On page load
    showQuestion(questionNumber);



}); // End document.ready