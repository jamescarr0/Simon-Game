let gameActive = false
let level = 1
let buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userPattern = []

// delay speeds in milliseconds.
const sequenceSpeed = 500
const levelDelaySpeed = 1500

function levelTitle(str) {
    let title = ""

    if (str === undefined) {
        title = "Level: " + level
    } else {
        title = str
    }
    $('#level-title').text(title)
}

function btnFeedbackAnimation(btnColor) {
    $("." + btnColor).addClass("flash")
    setTimeout(function () {
        $("." + btnColor).removeClass("flash")
    }, 250)
}

function gameOverAnimation() {
    $(document.body).addClass("game-over")
    setTimeout(function () {
        $(document.body).removeClass("game-over")
    }, 250)
}

function playSound(id) {
    let fileName = id
    if (id === undefined) { fileName = "wrong" }

    let sound = new Audio("/sounds/" + fileName + ".mp3")
    sound.play()
}

function checkAnswer(currentLevel, btnId) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        console.log("Correct")
        playSound(btnId)
        btnFeedbackAnimation(btnId)

        if (userPattern.length === gamePattern.length) {
            levelUp()
        }

    } else {
        console.log("gameover")
        gameOver()
        return
    }
}

function levelUp() {
    level++
    levelTitle()

    setTimeout(function () {
        resetPatterns()
        nextSequence()
        playGameSequence()
    }, levelDelaySpeed)
}

function resetPatterns() {
    userPattern = []
}

function gameOver() {
    // Change the body background red and then remove class - visual feedback for wrong answer
    gameOverAnimation()
    playSound()
    levelTitle("Game Over!")
    resetPatterns()
    level = 0
    gameActive = false
}

function nextSequence() {

    let randInt = Math.floor(Math.random() * 4)
    let color = buttonColors[randInt]
    gamePattern.push(color)

    console.log(gamePattern)
}

function playGameSequence() {
    for (var i = 0; i < level; i++) {
        let index = i
        setTimeout(function () {
            btnFeedbackAnimation(gamePattern[index])
            playSound(gamePattern[index])
        }, sequenceSpeed * index)
    }
}

// Mouse click event.
$(".btn").on("click", function (e) {
    /* 
        Get the id of the button clicked event 
        Remove the # sign from the beginning of the string.
    */

    let buttonClicked = e.target.id.slice(1, e.target.id.length)
    userPattern.push(buttonClicked)

    checkAnswer(userPattern.length - 1, buttonClicked)
})

// Button click event - Starts game.
$(document).keypress(function () {
    if (!gameActive) {
        gameActive = true

        levelTitle()
        nextSequence()
        
        setTimeout(playGameSequence, 1000)
    } else {
        console.log("Game already started")
    }
})

