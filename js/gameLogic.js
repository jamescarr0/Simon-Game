let level = 0
let buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userPattern = []

function btnFeedbackAnimation(btnColor) {
    $("." + btnColor).addClass("flash")
    setTimeout(function () {
        $("." + btnColor).removeClass("flash")
    }, 250)
}

function playSound(color) {
    switch (color) {
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
            break;
    }
}

function nextSequence() {
    let randInt = Math.floor(Math.random() * 4)
    let color = buttonColors[randInt]
    gamePattern.push(color)
    btnFeedbackAnimation(color)
    playSound(color)
}

$(".btn").on("click", function (e) {
    /* 
        Get the id of the button clicked event 
        Remove the # sign from the beginning of the string.
    */

    let buttonClicked = e.target.id.slice(1,e.target.id.length)
    userPattern.push(buttonClicked)
    btnFeedbackAnimation(buttonClicked)
    playSound(buttonClicked)
})



