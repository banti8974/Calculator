const currDisplay = document.querySelector(".curr-display");
const prevDisplay = document.querySelector(".prev-display");
const numbers = document.querySelectorAll(".number");
const operands = document.querySelectorAll(".operation");
const clearBtn = document.querySelector(".clear");
const delBtn = document.querySelector(".delete");
const equalBtn = document.querySelector(".equal");
let operation = null;
let previousValue = "";
let currentValue = "";

function appendNumber(number) {
    if (number === "." && currDisplay.innerText.includes(".")) return;
    currDisplay.innerText += number;
    currentValue = currDisplay.innerText;
}

function chooseOperation(operand) {
    if (currentValue === "") return;
    if (previousValue !== "") {
        compute();
    }
    operation = operand;
    previousValue = currentValue;
    prevDisplay.innerText = `${previousValue} ${operation}`;
    currDisplay.innerText = "";
    currentValue = "";
}

function clearDisplay() {
    currDisplay.innerText = "";
    prevDisplay.innerText = "";
    previousValue = "";
    currentValue = "";
    operation = null;
}

function compute() {
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "*":
            result = prev * current;
            break;
        case "/":
            result = prev / current;
            break;
        default:
            return;
    }
    currDisplay.innerText = result;
    previousValue = result;
    operation = null;
}

numbers.forEach(number => {
    number.addEventListener("click", () => {
        appendNumber(number.innerText);
    });
});

operands.forEach(operand => {
    operand.addEventListener("click", () => {
        chooseOperation(operand.innerText);
    });
});

clearBtn.addEventListener("click", () => {
    clearDisplay();
});

equalBtn.addEventListener("click", () => {
    if (operation !== null) {
        compute();
        prevDisplay.innerText = "";
    }
});

delBtn.addEventListener("click", () => {
    currDisplay.innerText = currDisplay.innerText.slice(0, -1);
    currentValue = currDisplay.innerText;
});
