let userClickedPattern = [];// to store user clicked sequence.
let gamePattern = []; // to store the game pattern
let buttonColors = ["red", "blue", "green", "yellow"];

let started = false; // a flag variable
let level = 0;

$(document).on("keypress", function () {
    if (!started) {
        started = true;
        $("#level-title").text("Level " + level);
        nextSequence();
    }
})

//to animate and store user clicked pad in userClickedPattern
$(".btn").on("click", function (event) {
    let userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);

    playSound(userChosenColor);
    animatePress(userChosenColor);
})

// Function to create next pattern in the sequence
function nextSequence() {

    // increase level by one each time nextSequence is called.
    level++;

    // update level change in H1 element.
    $("#level-title").text("Level " + level);

    userClickedPattern = []; //once the level is cleared or game restarts reset the userPattern array.

    // random number between 0-3
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber]; // randomly selecting a color from the color array. 
    
    gamePattern.push(randomChosenColor);
    console.log("Game Pattern: " + gamePattern);

    $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

// Function to check answer
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // console.log("user Pattern: " + userClickedPattern);
        // console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        } 
    }
    else { 
        // console.log("wrong"); 
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");

        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

// Function to restart the game.
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

// Function to play sound
function playSound(colorName) {
    let audio = new Audio("./sounds/" + colorName + ".mp3");
    audio.play();
}

// Function to animate userClicks
function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function () {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100)
}