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
            return divide(num1, num2).toFixed(2);
    }
}

function populateDisplay(operation) {
    const calculator = document.querySelector('#calculator');
    const display = calculator.querySelector('.display');
    let resetNum = false;

    calculator.addEventListener('click', event => {
        let target = event.target;

        if (!target.value) return;

        switch (target.value) {
            case 'all-clear':
                display.textContent = 0;
                operation.num = 0;
                operation.operator = '';
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
                if (operation.num) {
                    display.textContent = operate(operation.operator, operation.num, display.textContent);
                }
                operation.num = display.textContent;
                resetNum = true;
                operation.operator = target.value;
                break;

            case '=':
                if (isNaN(display.textContent) || !operation.operator || resetNum) {
                    break;
                }
                display.textContent = operate(operation.operator, operation.num, display.textContent);
                operation.num = 0;
                resetNum = true;
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
                if (display.textContent === '0' || resetNum) {
                    display.textContent = target.value;
                    resetNum = false;
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