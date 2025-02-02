const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
let targetColor = "";
let score = 0;

// Load sound effects
const correctSound = new Audio('assets/audio/ding-25997.mp3');  // Path to your correct sound
const wrongSound = new Audio('assets/audio/buzz-buzz-95806.mp3');    // Path to your wrong sound

function startGame() {
    score = 0;
    document.getElementById("score").textContent = score;
    newRound();
}

function newRound() {
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    document.getElementById("colorBox").style.backgroundColor = targetColor;
    const statusElement = document.getElementById("gameStatus");
    statusElement.textContent = "";
    statusElement.classList.remove("fade-out", "celebrate", "correct", "wrong");
    statusElement.classList.add("correct"); // Reset status to green

    const colorButtons = document.querySelectorAll(".color-option");
    colorButtons.forEach((button, index) => {
        button.style.backgroundColor = colors[index];
        button.onclick = () => checkGuess(colors[index]);
    });
}

function checkGuess(selectedColor) {
    const statusElement = document.getElementById("gameStatus");

    // Clear previous status classes
    statusElement.classList.remove("celebrate", "correct", "wrong", "fade-out");

    if (selectedColor === targetColor) {
        statusElement.textContent = "Correct!✅";
        statusElement.classList.add("celebrate", "correct");
        correctSound.play();  // Play the correct sound
        score++;
        document.getElementById("score").textContent = score;
        setTimeout(newRound, 1000);
    } else {
        statusElement.textContent = "Wrong, try again!❌";
        statusElement.classList.add("wrong", "fade-out");
        wrongSound.play();  // Play the wrong sound
        setTimeout(() => {
            statusElement.textContent = "";
            statusElement.classList.remove("fade-out", "wrong");
        }, 1000);
    }
}

document.getElementById("newGameButton").addEventListener("click", startGame);

startGame();
