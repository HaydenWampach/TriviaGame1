$(document).ready(function(){
    //setting data variables and time to countdown
    var gameData = {
        intervalId: null,
        timeLeft: 60,
        correctAnswers: 0,
        incorrectAnswers: 0,
        userAnswers: []
    }
    //question object, displays the question, choices for each, and the answer by index of the array
    var questionsObj = [
        {
            question: 'In what city was the Decleration of Independence signed?',
            choices: ['Boston', 'New York', 'Philadelphia', 'Richmond'],
            answer: 'Philadelphia'
        },
        {
            question: 'What year did the U.S. enter WWII?',
            choices: ['1939', '1941', '1943', '1945'],
            answer: '1941'
        }, 
        {
            question: 'What year did Washington become a state"?',
            choices: ['1879', '1889', '1899', '1909'],
            answer: '1889'
        },
        {
            question: 'Who was the 2nd president of the United States?',
            choices: ['Alexander Hamilton', 'John Adams', 'Thomas Jefferson', 'John Hancock'],
            answer: 'John Adams'
        }, 
        {
            question: 'What was the first capital of the United States?',
            choices: ['New York', 'Washington D.C.', 'Boston', 'Philadelphia'],
            answer: 'New York'
        }, 
        {
            question: 'What year did the American Civil War begin"?',
            choices: ['1876', '1856', '1893', '1861'],
            answer: '1861'
        }, 
    ];

    $('#questions').hide();
    $('#gameOver').hide();
    $('#submitButton').hide();

    function populateUserAnswers(){
        for(var i = 0; i< questionsObj.length; i++){
            gameData.userAnswers.push(null)
        }
    }

    populateUserAnswers();

    // check if user answers are right or wrong
    function evaluateUserAnswers(){ 
        for(var i = 0; i< gameData.userAnswers.length; i++){
            if(gameData.userAnswers[i] === questionsObj[i].answer){
                gameData.correctAnswers++
            }else {
                gameData.incorrectAnswers++ 
            }
        }
    }

    // create game questions and options
    function createQuestionsHtml(){
        for(var i = 0; i < questionsObj.length;i++){
            var wrap = $('<div>').addClass('questions q-wrap').attr('id', 'question-'+i);
            var question = $('<p>').addClass('q-text').text(questionsObj[i].question);
            var optionWrap = $('<div>').addClass('o-wrap');
            for(var j = 0; j < questionsObj[i].choices.length; j++){
                var options = questionsObj[i].choices;
                var radioOption = '<input type="radio" data-index="'+i+' "class="option" id="o-'+j+'" name="question'+i+'" value="'+options[j]+'">'+options[j];
                $(optionWrap).append(radioOption);
            }
            
            $(wrap).append(question, optionWrap);
            displayQuestionsHtml(wrap);
        }
    }

    // displaying game questions on the page
    function displayQuestionsHtml(wrap){
        $('#questions').append(wrap)
    }

    // update users answer for each question on change
    $('#questions').on('change', '.option', function(event){
        var selectedOptionName = $(this).attr('name');
        var userAnswer = $('input[name='+selectedOptionName+']:checked').val();
        var index = $(this).data('index');
        gameData.userAnswers.splice(index,1, userAnswer);
    });

    function runGame(){
        //display the questions after the game has started 
        $('#startContainer').hide();
        $('#instructionContainer').hide();
        createQuestionsHtml();
        $('#questions').show();
        $('#submitButton').show();

        //start timer and allow button clicks on bubbles 
        startTimer();
        decrement();
    }


    $('#startContainer').on('click', function() {
        //hides the start button and instruction panel, shows questions, starts countdown
        runGame();
    });

    function startTimer() {
        clearInterval(gameData.intervalId);
        gameData.intervalId = setInterval(decrement, 1000);
    }

    function decrement() {
        //  Decrease number by one.
        gameData.timeLeft--;
            //  Show the number in the #show-number tag.
        $('#timeRemaining').html('<h2>' + gameData.timeLeft + ' Seconds Remaining' + '</h2>');
        //  Once number hits zero...
        if (gameData.timeLeft === 0) {
            //Stop the game and Alert the user that they lost
            stopGame();
        }
    }
    $('#submitButton').on('click', function() {
        stopGame();
        //scroll to the top of the page so the user doesn't have to
        $(window).scrollTop(0);
    })

    function stopGame() {
        //if time hits zero, Stop the game and Alert the user that they lost
        clearInterval(gameData.intervalId);
        $('#timeRemaining').html('<h2>The game has ended!</h2>');
        $('#questions').empty().hide();
        //display game over container and hide the submit button 
        $('#gameOver').show();
        $('#submitButton').hide();

        evaluateUserAnswers();

        $('#correctAnswersTotal').text('You answered ' + gameData.correctAnswers + ' correctly.');
        $('#incorrectAnswersTotal').text('You answered ' + gameData.incorrectAnswers + ' incorrectly.');
    }
     //asks user to play again, restarts game if clicked
    $('.playAgainButton').on('click', function() {
        //restart variables 
        gameData.timeLeft = 60;
        gameData.correctAnswers = 0;
        gameData.incorrectAnswers = 0;
        //toggle songs, toggle viewport
        $('#gameOver').hide();
        $('#instructionContainer').show();
        runGame();
    })
});