/****** VARIABLES ******/

/* INSIDE THE DOCUMENT */

const startBtn = document.getElementById('start-btn')
const calculationContainer = document.getElementById('calculation-container')
const calculationField = document.getElementById('calculation-field')
const inputField = document.getElementById('input-field')
const pointsCount = document.getElementById('points-count')
const explanations = document.getElementById('explanations')
const submitBtn = document.getElementById('submit-btn')
const commentary = document.getElementById('commentary')
const timer = document.getElementById('timer')

/* OUTSIDE THE DOCUMENT */

let score = 0
let num1 = 0
let num2 = 0
let allOperator = ['+', '-', '*', '/']
let operator = "+"
let time = 60
let result = 0


/***** FUNCTIONS *****/

/* START AND FINISH THE GAME */

// Start the game with a eventListener
startBtn.addEventListener('click', function startGame() {
    startBtn.classList.add('hidden')
    explanations.classList.add('hidden')
    calculationField.classList.remove('hidden')
    inputField.classList.remove('hidden')
    submitBtn.classList.remove('hidden')
    setTimeout(endGame, 61000)
    setInterval(removeTime, 1000)
    generateCalculation()
    inputField.value = ""
    inputField.onselect

    submitBtn.addEventListener('click', verifiedNumber)
    document.addEventListener('keydown', enterSubmit)
})

// Ending the game
function endGame() {
    commentary.innerText = `It's over! Your score is ${score}!`
    commentary.style.color="yellow"
    submitBtn.removeEventListener('click', verifiedNumber)
    document.removeEventListener('keydown', enterSubmit)
}


/* GENERATE MENTAL CALCULATIONS */

// Generate two numbers
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

// Function who combine the two previous numbers and the operator
function generateCalculation() {
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
        // If the lenght of the result is too long => restart the function
        if (result.toString().length > 2) {
            generateCalculation()
        } 
    }

    calculationField.innerText = `${num1} ${operator} ${num2}`
    inputField.value = ""
    inputField.select()
}

/* RENDERING FUNCTIONS */

// Render score
function renderScore() {
    pointsCount.innerText = `Score: ${score}`
}

// Render and remove time left each second
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


/* SUBMIT FUNCTIONS */

// Submit with enter key
function enterSubmit(e) {
    if (e.key == "Enter") {
        verifiedNumber()
    }
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
        generateCalculation()

    } else {
        commentary.innerText = 'Wrong answers! =('
        commentary.style.color="red"
    }
}
