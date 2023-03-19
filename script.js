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

function populateDisplay(e) {
    const currentValue = document.querySelector('#display-current');
    if (e.target.className === 'number') {
        if (currentValue.innerText === '0') {
            currentValue.innerText = e.target.innerText;
        } else {
            currentValue.innerText += e.target.innerText;
        }
    }
}

function calculator() {
    const allButtons = document.querySelectorAll("#button-container button");
    allButtons.forEach(button => {
        button.addEventListener('click', populateDisplay);
    });
}

calculator();