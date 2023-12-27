const current = document.querySelector('#current-value');
const operation = document.querySelector("#operation");
calculator();

function calculator() {
    const numbers = document.querySelectorAll("button[data-type='number']");
    const operands = document.querySelectorAll("button[data-type='operand']");
    const enter = document.querySelector("#enter");
    const clear = document.querySelector("#clear");
    const del = document.querySelector("#delete");
    const point = document.querySelector("#point");
    const negative = document.querySelector("#negative");

    numbers.forEach(num => {
        num.addEventListener('click', appendNumber);
    });

    operands.forEach(operand => {
        operand.addEventListener('click', evaluate);
    })

    enter.addEventListener('click', evaluate);
    clear.addEventListener('click', cleanUp);
    del.addEventListener('click', deleteLastDigit);
    point.addEventListener('click', appendPoint);
    negative.addEventListener('click', timesNegative);
}

function appendNumber(e) {
    const enteredNumber = e.target.innerText;
    const currentValue = current.innerText;

    if (currentValue === '0' || toBeReset()) {
        current.innerText = enteredNumber;
        current.classList.remove('reset');
    } else {
        current.innerText += enteredNumber;
    }
}

function evaluate(e) {
    const operand = getPreviousOperand(operation.innerText.slice(-1));
    const currentValue = +current.innerText;

    if (currentValue === 0 && operand === 'divide') {
        current.innerText = 'ERR!';
        operation.innerText = 'Cannot divide by 0, click to reset';
        current.classList.add('reset');
        return;
    }
    
    const lastValue = +operation.innerText.slice(0, -2);
    const result = operate(operand, lastValue, currentValue);

    if (e.target.id === 'enter') {
        if (toBeReset()) {
            return;
        } else if (operation.innerText && !isNaN(result)) {
            operation.innerText = `${lastValue} ${getOperandSymbol(operand)} ${currentValue} =`;
            current.innerText = result;
        } else {
            return;
        }
    } else {
        if (operation.innerText && !operation.innerText.includes('=')) {
            operation.innerText = `${result} ${e.target.innerText}`;
        } else {
            operation.innerText = `${currentValue} ${e.target.innerText}`;
        }
    }

    current.classList.add('reset');
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operand, num1, num2) {
    switch(operand) {
        case 'add':
            return (add(num1, num2));

        case 'subtract':
            return (subtract(num1, num2));

        case 'multiply':
            return (multiply(num1, num2));

        case 'divide':
            return (divide(num1, num2));
    }
}

function getPreviousOperand(operand) {
    switch(operand) {
        case '+':
            return 'add';

        case '-':
            return 'subtract';

        case '*':
            return 'multiply';

        case '/':
            return 'divide';
    }
}

function getOperandSymbol(operand) {
    switch(operand) {
        case 'add':
            return '+';

        case 'subtract':
            return '-';

        case 'multiply':
            return '*';

        case 'divide':
            return '/';
    }
}

function cleanUp() {
    current.innerText = 0;
    operation.innerText = '';
}

function isSingleDigit(num) {
    return num.length == 1;
}

function deleteLastDigit() {
    current.innerText = isSingleDigit(current.innerText) ? 0 : current.innerText.slice(0, -1);
}

function toBeReset() {
    return current.classList.contains('reset');
}

function appendPoint(e) {
    if (!current.innerText.includes('.')) {
        current.innerText += e.target.innerText;
    }
}

function timesNegative() {
    current.innerText *= -1;
}