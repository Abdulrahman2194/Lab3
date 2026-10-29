// State Management
let currentInput = '0';
let previousInput = '';
let currentOperator = null;
let shouldResetDisplay = false;

// DOM Elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// Update Display Helper
function updateDisplay() {
  display.textContent = currentInput;
}

// Clear All
function handleClear() {
  currentInput = '0';
  previousInput = '';
  currentOperator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

// Number Inputs
function handleNumber(number) {
  if (currentInput === '0' || shouldResetDisplay) {
    currentInput = number;
    shouldResetDisplay = false;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

// Double Zero (00) Input
function handleDoubleZero() {
  if (currentInput === '0' || shouldResetDisplay) {
    currentInput = '0';
    shouldResetDisplay = false;
  } else {
    currentInput += '00';
  }
  updateDisplay();
}

// Decimal Input
function handleDecimal() {
  if (shouldResetDisplay) {
    currentInput = '0.';
    shouldResetDisplay = false;
  } else if (!currentInput.includes('.')) {
    currentInput += '.';
  }
  updateDisplay();
}

// Percentage Input
function handlePercent() {
  const value = parseFloat(currentInput);
  if (!isNaN(value)) {
    currentInput = (value / 100).toString();
    updateDisplay();
  }
}

// Operators (+, -, *, /)
function handleOperator(operator) {
  if (currentOperator !== null && !shouldResetDisplay) {
    handleCalculate();
  }
  previousInput = currentInput;
  currentOperator = operator;
  shouldResetDisplay = true;
}

// Calculation Logic
function handleCalculate() {
  if (currentOperator === null || shouldResetDisplay) return;

  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);

  if (isNaN(num1) || isNaN(num2)) return;

  let result = 0;
  switch (currentOperator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num2 !== 0 ? num1 / num2 : 'Error';
      break;
    default:
      return;
  }

  currentInput = result.toString();
  currentOperator = null;
  shouldResetDisplay = true;
  updateDisplay();
}

// Event Listeners
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const value = button.dataset.value;

    if (!action) {
      handleNumber(value);
      return;
    }

    switch (action) {
      case 'clear':
        handleClear();
        break;
      case 'double-zero':
        handleDoubleZero();
        break;
      case 'decimal':
        handleDecimal();
        break;
      case 'percent':
        handlePercent();
        break;
      case 'operator':
        handleOperator(value);
        break;
      case 'calculate':
        handleCalculate();
        break;
    }
  });
});