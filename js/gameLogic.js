let gameActive = false
let level = 1
let buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userPattern = []

// delay speeds in milliseconds.
const sequenceSpeed = 500
const levelDelaySpeed = 1500

// Randomly generate the next colour in the sequence
function nextSequence() { 
    gamePattern.push(buttonColors[Math.floor(Math.random() * 4)]) 
}

// Show user the current game sequence for the current level. 
function playGameSequence() {
    for (var i = 0; i < level; i++) {
        let index = i
        setTimeout(function () {
            playSound(gamePattern[index])
            btnFeedbackAnimation(gamePattern[index])
        }, sequenceSpeed * index)
    }
}

// Visual feedback for user.  Colour 'flashes' on screen.
function btnFeedbackAnimation(btnColor) {
    $("." + btnColor).addClass("flash")
    setTimeout(function () {
        $("." + btnColor).removeClass("flash")
    }, 250)
}

// Check users answer against the game pattern.  
function checkAnswer(currentLevel, btnId) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        playSound(btnId)
        btnFeedbackAnimation(btnId)

        if (userPattern.length === gamePattern.length) { levelUp() }
    } else { gameOver(); return }
}

// Add another colour to the game sequence and increment level on screen.
function levelUp() {
    level++
    updateLevelText()
    setTimeout(function () {
        resetUserPattern()
        nextSequence()
        playGameSequence()
    }, levelDelaySpeed)
}

// Update level on screen.
function updateLevelText(str) {
    let title = ""
    if (str === undefined) {
        title = "Level: " + level
        $('#feedback').text(title)
    }
    else { $('#level-title').text(str) }
}

// Game over! reset game.
function gameOver() {
    gameActive = false
    playSound("wrong")
    gameOverAnimation()
    updateLevelText("Game Over")
    resetGame()
}

// Flash the screen red on incorrect answer.
function gameOverAnimation() {
    $(document.body).addClass("game-over")
    setTimeout(function () {
        $(document.body).removeClass("game-over")
    }, 250)
}

// Reset the user input pattern.
function resetUserPattern() { userPattern = [] }

// Create a file path to the sound and play the corresponding sound.
function playSound(fileName) {
    let sound = new Audio("/sounds/" + fileName + ".mp3")
    sound.play()
}

// Mouse click event / User selecting answering.  Append to user pattern.
$(".btn").click(function (e) {
    /* 
        Get the id of the button clicked event 
        Remove the # sign from the beginning of the string.
    */
    if (gameActive) {
        let buttonClicked = e.target.id.slice(1, e.target.id.length)
        userPattern.push(buttonClicked)
        checkAnswer(userPattern.length - 1, buttonClicked)
    }
})

function runGame() {
    gameActive = true
    updateLevelText()
    updateLevelText("Game started")
    nextSequence()
    setTimeout(playGameSequence, 1000)
}

function resetGame() {
    level = 1
    gamePattern.length=0
    userPattern.length=0
}

// Button click event - Start game.
$("button").click(function (e) { 

    if (e.target.id==="#start-btn") {
        console.log("start button")
        if (!gameActive) {
            runGame() 
       }
    }
    else { 
        console.log("reset button")
        gameOver()
        updateLevelText("Reset: Click start to play")
        resetGame()
    }
})