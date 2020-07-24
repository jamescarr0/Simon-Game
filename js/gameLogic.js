let gameActive = false
let level = 3
let buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userPattern = []

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
    switch (id) {
        case "red":
            let red = new Audio("/sounds/red.mp3")
            red.play()
            break;
        case "blue":
            let blue = new Audio("/sounds/blue.mp3")
            blue.play()
            break;
        case "green":
            let green = new Audio("/sounds/green.mp3")
            green.play()
            break;
        case "yellow":
            let yellow = new Audio("/sounds/yellow.mp3")
            yellow.play()
            break;
        default:
            let gameOver = new Audio("/sounds/wrong.mp3")
            gameOver.play()
            break;
    }
}

function checkAnswer(currentLevel, btnId) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        console.log("Correct")
        playSound(btnId)
        btnFeedbackAnimation(btnId)

        if(userPattern.length===gamePattern.length) {
            console.log("seq complete level up")
        }

    } else {
        console.log("gameover")
        gameOver()
        return
    }
}

function gameOver() {
    // Change the body background red and then remove class - visual feedback for wrong answer
    gameOverAnimation()
    playSound()
    levelTitle("Game Over!")
    level = 0
}

function nextSequence() {
    for (let i = 0; i < level; i++) {
        let randInt = Math.floor(Math.random() * 4)
        let color = buttonColors[randInt]
        gamePattern.push(color)
    }
    console.log(gamePattern)
}

function playGameSequence() {
    for (var i = 0; i < level; i++) {
        let index = i
        setTimeout(function () {
            btnFeedbackAnimation(gamePattern[index])
            playSound(gamePattern[index])
        }, 1000 * index)
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
        playGameSequence()
    } else {
        console.log("Game already started")
    }
})

