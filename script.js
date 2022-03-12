/* VARIABLES */

/* Inside the DOM */

const startBtn = document.getElementById('start-btn')
const calculContainer = document.getElementById('calcul-container')
const calculField = document.getElementById('calcul-field')
const inputField = document.getElementById('input-field')
const pointsCount = document.getElementById('points-count')
const submitBtn = document.getElementById('submit-btn')
const commentary = document.getElementById('commentary')
const timer = document.getElementById('timer')

/* Outside the DOM */

let score = 0
let num1 = 0
let num2 = 0
let allOperator = ['+', '-', '*', '/']
let operator = "+"
let time = 60

let result = 0

/* FUNCTIONS */

// Generate number
function generateNumber() {
    return Math.floor(Math.random() * (10 - 1 +1)) + 1
}

// Choose Operator
function chooseOperator() {
    let random = Math.floor(Math.random() * allOperator.length)
    if (allOperator[random] === "+") {
        operator = "+"
        return operator
    } else if (allOperator[random] === "-") {
        operator = "-"
        return operator
    } else if (allOperator[random] === "/") {
        operator = "/"
        return operator
    } else {
        operator = "*"
        return operator
    }
}

// Function generate Calcul
// I generate two numbers and a operator.
function generateCalcul() {
    num1 = generateNumber()
    num2 = generateNumber()
    operator = chooseOperator()

    if (operator === "+") {
        result = num1 + num2
    } else if (operator === "-") {
        result = num1 - num2
    } else if (operator === "*") {
        result = num1 * num2
    } else {
        result = num1 / num2
        
        if (result.toString().length > 2) {
            generateCalcul()
        } 
    }

    calculField.innerText = `${num1} ${operator} ${num2}`
    inputField.value = ""
    inputField.select()
}

// Render score
function renderScore() {
    pointsCount.innerText = `Score: ${score}`
}

// Remove time each second
function removeTime() {
    // Convert 'time' to minutes and second
    let minutes = parseInt(time / 60, 10)
    let secondes = parseInt(time % 60, 10)

    // Add 0 with conditionals
    minutes = minutes < 10 ? "0" + minutes : minutes
    secondes = secondes < 10 ? "0" + secondes : secondes

    // Render time and decrement while time > 0
    timer.innerText = `${minutes}:${secondes}`
    time = time <= 0 ? 0 : time - 1
}

// Verified Number
function verifiedNumber() {
    if (inputField.value == result) {
        commentary.innerText = 'Good answers! =)'
        commentary.style.color="green"

        if (operator === "+" || operator === "-") {
            score++
        } else {
            score += 2
        }

        renderScore()
        generateCalcul()

    } else {
        commentary.innerText = 'Wrong answers! =('
        commentary.style.color="red"
    }
}

// Submit with enter key
function enterSubmit(e) {
    if (e.key == "Enter") {
        verifiedNumber()
    }
}

 

function endGame() {
    commentary.innerText = `It's over! Your score is ${score}!`
    commentary.style.color="yellow"
    submitBtn.removeEventListener('click', verifiedNumber)
    document.removeEventListener('keydown', enterSubmit)
}

/* EVENT LISTENER */

startBtn.addEventListener('click', function startGame() {
    startBtn.classList.add('hidden')
    calculField.classList.remove('hidden')
    inputField.classList.remove('hidden')
    submitBtn.classList.remove('hidden')
    setTimeout(endGame, 61000)
    setInterval(removeTime, 1000)
    generateCalcul()
    inputField.value = ""
    inputField.onselect

    submitBtn.addEventListener('click', verifiedNumber)
    document.addEventListener('keydown', enterSubmit)
})

