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

function getOperandText(operand) {
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
    const current = document.querySelector('#current-value');
    const operation = document.querySelector("#operation");
    current.innerText = 0;
    operation.innerText = '';
}

function isSingleDigit(num) {
    return num.length == 1;
}

function populateDisplay(e) {
    const selection = e.target.dataset.type;
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
        if (current.classList.contains('saved')) {
            return;
        }
        if (operation.innerText) {
            const lastValue = +operation.innerText.slice(0, -2);
            const operand = getOperandText(operation.innerText.slice(-1));
            const result = operate(operand, lastValue, currentValue);
            operation.innerText = `${lastValue} ${getOperandSymbol(operand)} ${currentValue} =`;
            current.innerText = result;
            current.classList.add('saved');
        }
    } else if (selection === 'operand') {
        if (operation.innerText && !operation.innerText.includes('=')) {
            const lastValue = +operation.innerText.slice(0, -2);
            const operand = getOperandText(operation.innerText.slice(-1));
            const result = operate(operand, lastValue, currentValue);
            operation.innerText = `${result} ${e.target.innerText}`;
        } else {
            operation.innerText = `${currentValue} ${e.target.innerText}`;
        }

        current.classList.add('saved');
    } else if (selection === 'clear') {
        cleanUp();
    } else if (selection === 'delete') {
        current.innerText = isSingleDigit(current.innerText) ? 0 : current.innerText.slice(0, -1);
    } else if (selection === 'negative') {
        current.innerText *= -1;
    }
}

function calculator() {
    const allButtons = document.querySelectorAll("#button-container button");
    allButtons.forEach(button => {
        button.addEventListener('click', populateDisplay);
    });
}

calculator();