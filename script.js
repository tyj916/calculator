function add(a, b) {
    return +a + +b;
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
    switch (operator) {
        case '+':
            return add(num1, num2);

        case '-':
            return subtract(num1, num2);

        case '*':
            return multiply(num1, num2);

        case '/':
            return divide(num1, num2);
    }
}

function populateDisplay(operation) {
    const calculator = document.querySelector('#calculator');
    const display = calculator.querySelector('.display');

    calculator.addEventListener('click', event => {
        let target = event.target;

        if (!target.value) return;

        switch (target.value) {
            case 'all-clear':
                display.textContent = 0;
                break;

            case 'negative':
                if (!isNaN(display.textContent)) {
                    display.textContent *= -1;
                }
                break;

            case '+':
            case '-':
            case '*':
            case '/':
                if (!isNaN(display.textContent)) {
                    operation.num = display.textContent;
                }
                operation.operator = target.value;
                display.textContent = target.value;
                break;

            case '=':
                if (isNaN(display.textContent) || !operation.operator) {
                    break;
                } else {
                    let num1 = operation.num;
                    let operator = operation.operator;
                    let num2 = display.textContent;
                    display.textContent = operate(operator, num1, num2);
                    operation.num = display.textContent;
                }
                break;

            case '.':
                if (isNaN(display.textContent)){
                    break;
                }
                if (!display.textContent.includes('.')) {
                    display.textContent += target.value;
                }
                break;

            default:
                if (display.textContent === '0' || isNaN(display.textContent)) {
                    display.textContent = target.value;
                } else {
                    display.textContent += target.value;
                }
                break;
        }
    });
}

let operation = {
    num: 0,
    operator: '',
};
populateDisplay(operation);