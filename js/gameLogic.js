let gameActive = false
let level = 1
let buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userPattern = []

// delay speeds in milliseconds.
const sequenceSpeed = 500
const levelDelaySpeed = 1500

// Randomly generate the next colour in the sequence
function nextSequence() { gamePattern.push(buttonColors[Math.floor(Math.random() * 4)]) }

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
    levelTitle()

    setTimeout(function () {
        resetPatterns()
        nextSequence()
        playGameSequence()
    }, levelDelaySpeed)
}

// Change the level text inside #level-title on page.
function levelTitle(str) {
    let title = ""

    if (str === undefined) { title = "Level: " + level } 
    else { title = str }
    $('#level-title').text(title)
}

// Game over! reset game.
function gameOver() {
    playSound()
    gameOverAnimation()
    levelTitle("Game Over")
    resetPatterns()
    level = 0
    gameActive = false
}

// Flash the screen red on incorrect answer.
function gameOverAnimation() {
    $(document.body).addClass("game-over")
    setTimeout(function () {
        $(document.body).removeClass("game-over")
    }, 250)
}

// Reset the user input pattern.
function resetPatterns() { userPattern = [] }

// Create a file path to the sound and play the corresponding sound.
function playSound(id) {
    let fileName = id
    if (id === undefined) { fileName = "wrong" }
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

// Button click event - Start game.
$(document).on("keypress", function () {
    if (!gameActive) {
        gameActive = true
        levelTitle()
        nextSequence()
        setTimeout(playGameSequence, 1000)
    }
})

