let buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = []

function nextSequence() {
    let randInt = Math.floor(Math.random()*4)
    let color = buttonColors[randInt]

    gamePattern.push(color)

    $("."+color).addClass("flash")
    setTimeout(function() {
        $("."+color).removeClass("flash")
    }, 250)

}