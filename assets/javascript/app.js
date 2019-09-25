$(document).ready(function(){
    var gameData = {
        intervalId: null,
        timeLeft: 45,
        correctAnswers: 0,
        incorrectAnswers: 0,
        userAnswers: []
    }

    var questionsObject= [
        {
            question: "Who was the 2nd President of the United States?",
            options: ["Alexander Hamilton", "John Adams", "Thomas Jefferson", "James Madison"],
            answer: "John Adams"
        },
        {
            question: "What city was the Declaration of Indepence and Constitution signed?",
            options: ["Boston", "New York", "Richmond", "Philadelphia"],
            answer: "Philadelphia"
        },
        {
            question: "What year did the U.S. Civil War begin?",
            options: ["1854", "1816", "1845", "1861"],
            answer: "1861"
        },
        {
            question: "When did Washington become a state?",
            options: ["1889", "1884", "1891", "1879"],
            answer: "1889"
        },
        {
            question: "In what year did the United States enter WWII?",
            options: ["1941", "1939", "1944", "1940"],
            answer: "1941"
        },
    ];
    
    $("#questions").hide();
    $("gameOver").hide();
    $("submitButton").hide();

    function populateUserAnswers(){
        for(var i = 0; i < questionsObject.length; i++){
            gameData.userAnswers.push(null)
        }
    }

    populateUserAnswers();
    //check if answer is right or wrong
    function evaluateUserAnswers(){
        for(var i = 0; i < gameData.userAnswers.length; i++){
            if(gameData.UserAnswers[i] === questionObject[i].answer){
                gameData.correctAnswers++
            }else{
                gameData.incorrectAnswers++
            }
        }
    }
    //game questions and options
    function createQuestions(){
        for(var i = 0; i < questionsObject.length; i++){
            var wrap = $("<div>").addClass("questions q-wrap").attr("id", "question-"+i);
            var question = $("<p>").addClass("q-text").texte(questionObject[i].question);
            var optionWrap = $("<div>").addClass("c-wrap");
            for(var j = 0; j < questionsObject[i].answer.length; j++){
                var choices = questionsObject[i].answers;
                var radioOption = '<input type="radio" data-index="'+i+' "class="option" id="o-'+j+'" name="question'+i+'" value="'+option[j]+'">'+choices[j];
                $(optionWrap).append(radioOption);
            }
            $(wrap).append(question, optionWrap);
            displayQuestionsHtml(wrap);
        }
    }

    function displayQuestionsHtml(wrap){
        $("#questions").append(wrap)
    }

    $("#questions").on("change", ".option", function(event){
        var selectedOptionName = $(this).attr("name");
        var userAnswer = $("input[name='selctedOptionName+']:checked").val();
        var index = $(this).data('index');
        gameData.userAnswers.splice(index, 1, userAnswer);
    });

    function runGame(){
        $("#startContainer").hide();
        $("#instructionsContainer").hide();
        createQeuestionsHtml();
        $("#questions").show();
        $("#submitButton").show();

        startTimer();
        decrement();
    }

    $("#startContainer").on("click", function() {
        runGame();
    });

    function startTimer() {
        clearInterval(gameData.intervalId);
        gameData.intervalId = setInterval(decrement, 1000);
    }

    function decrement() {
        gameData.timeLeft--;
        $("#timeRemaining").html("<h2>" + gameData.timeLeft + "Seconds Remaining" + "</h2>");
        if(gameData.timeLeft === 0){
            stopGame();
        }
    }
    $("#submitButton").on("click", fuction() {
        stopGame();
        $(window).scrollTop(0);
    })

    function stopGame() {
        clearInterval(gameData.intervalId);
        $("#timeRemaining").html("<h2>Game over!</h2>");
        $("#questions").empty().hide();

        //display game over and hide submit button
        $("#gameOver").show();
        $("#submitButton").hide();

        evaluateUserAnswers();

        $("#correctAnswersTotal").text("You answered " + gameData.correctAnswers + "correctly!");
        $("#incorrectAnswersTotal").text("You answered " + gameData.incorrectAnswers + "incorrectly.");        
    }

    $("playAgainButton").on("click", function() {
        gameData.timeLeft = 45;
        gameData.correctAnswers = 0;
        gameData.incorrectAnswers = 0;

        $("#gameOver").hide();
        $("#instructionContainer").show();
        runGame();
    })
});
