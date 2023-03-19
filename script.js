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

function operate(operator, num1, num2) {
    switch(operator) {
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

function getOperand(operand) {
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

function populateDisplay(e) {
    const selection = e.target.className;
    const current = document.querySelector('#current-value');
    const operation = document.querySelector("#operation");
    const currentValue = +current.innerText;

    if (selection === 'number') {
        if (currentValue === 0 || current.classList.contains('saved')) {
            current.innerText = e.target.innerText;
            current.classList.remove('saved');
        } else {
            current.innerText += e.target.innerText;
        }
    } else if (selection === 'enter') {

    } else if (selection === 'operand') {
        if(operation.innerText) {
            const lastValue = +operation.innerText.slice(0, -2);
            const operand = getOperand(operation.innerText.slice(-1));
            const result = operate(operand, lastValue, currentValue);
            operation.innerText = `${result} ${e.target.innerText}`;
        } else {
            operation.innerText = `${+current.innerText} ${e.target.innerText}`;
        }

        current.classList.add('saved');
    }
}

function calculator() {
    const allButtons = document.querySelectorAll("#button-container button");
    allButtons.forEach(button => {
        button.addEventListener('click', populateDisplay);
    });
}

calculator();