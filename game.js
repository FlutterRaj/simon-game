var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userChosenColour;
var userClickedPattern = [];
var randomChosenColour;
var isTheGameStart = false;
var level = 0;


$(document).keypress(function () {
    if (isTheGameStart == false) {
        $("#level-title").text("Level " + level);
        nextSequence();
        isTheGameStart = true;
    }
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.round(Math.random() * 3);
    randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}


$(".btn").click(function (event) {

    userChosenColour = event.target.id; //the color  
    userClickedPattern.push(userChosenColour); // add to list 

    playSound(userChosenColour);

    var userChosenColourToId = "#" + userChosenColour;
    $(userChosenColourToId).addClass("pressed");
    setTimeout(function () {
        $(userChosenColourToId).removeClass("pressed");
    }, 100);


    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver() {
    gamePattern = [];
    isTheGameStart = false;
    level = 0;
}


function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

