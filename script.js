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

function calculate(operation) {
    const split = operation.split(' ');
    const num1 = split[0];
    const operator = split[1];
    const num2 = split[2];
    const result = operate(operator, num1, num2);
    return result;
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

console.log(calculate('1 + 2'));