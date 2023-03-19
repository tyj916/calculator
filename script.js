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

function isCalculated() {
    const current = document.querySelector('#current-value');
    return current.classList.contains('calculated');
}

function populateDisplay(e) {
    const selection = e.target.dataset.type;
    const current = document.querySelector('#current-value');
    const operation = document.querySelector("#operation");
    if (current.innerText.includes('ERR')) {
        current.innerText = 0;
        operation.innerText = '';
        return;
    }
    const currentValue = +current.innerText;
    

    switch(selection) {
        case 'number':
            if (currentValue === 0 || isCalculated()) {
                current.innerText = e.target.innerText;
                current.classList.remove('calculated');
            } else {
                current.innerText += e.target.innerText;
            }
            break;

        case 'enter':
        case 'operand':
            if (operation.innerText) {
                const lastValue = +operation.innerText.slice(0, -2);
                const operand = getOperandText(operation.innerText.slice(-1));

                if (currentValue === 0 && operand === 'divide') {
                    current.innerText = 'ERR!';
                    return;
                }
                
                const result = operate(operand, lastValue, currentValue);

                if (selection === 'enter') {
                    if (isCalculated()) {
                        return;
                    }
                    operation.innerText = `${lastValue} ${getOperandSymbol(operand)} ${currentValue} =`;
                    current.innerText = result;
                } else {
                    if (!operation.innerText.includes('=')) {
                        operation.innerText = `${result} ${e.target.innerText}`;
                    } else {
                        operation.innerText = `${currentValue} ${e.target.innerText}`;
                    }
                }
            } else {
                if (selection === 'operand') {
                    operation.innerText = `${currentValue} ${e.target.innerText}`;
                }
            }
            current.classList.add('calculated');
            break;

        case 'clear' :
            cleanUp();
            break;

        case 'delete' :
            current.innerText = isSingleDigit(current.innerText) ? 0 : current.innerText.slice(0, -1);
            break;

        case 'negative':
            current.innerText *= -1;
            break;
    }
}

function calculator() {
    const allButtons = document.querySelectorAll("#button-container button");
    allButtons.forEach(button => {
        button.addEventListener('click', populateDisplay);
    });
}

calculator();