//define Calculator class
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement){
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }
  clear(){
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete(){
    //slice from the first to the last not include last and store it in the the variable
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  appendNumber(number){
    if(number === '.' && this.currentOperand.toString().includes('.')) return;
    if(number === '.' && this.currentOperand === ''){
      this.currentOperand = '0' + this.currentOperand.toString();
    }
    //convert to string so the number will not be added to each other but add be side one another
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  chooseOperation(operation){
    //if currentOperand equals nothing then do nothing
    if(this.currentOperand === '') return
    //check if previousOperand has value if so do the compute() funciton
    if(this.previousOperand !== ''){
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand.toString() + operation.toString();
    this.currentOperand = '';
  }
  compute(){
    //result valuable
    let computation
    //chnage the value to number and store is in a valuable
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    //check if there is no value in the previousOperand and currentOperand
    //since paseFloat will return NaN if the parameter cannot be converted to number
    if(isNaN(prev) || isNaN(current)) return;
    //check the operation and compute accordingly
    switch(this.operation){
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
      return;
    }
    this.currentOperand = computation;
    this.previousOperand = '';
    this.operation = undefined;
  }
  updateDisplay(){
    //put the new value to the associated innerText
    currentOperandTextElement.innerText = this.currentOperand;
    previousOperandTextElement.innerText = this.previousOperand;
  }
}

//cash the DOM by data attributes
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const equalsButton = document.querySelector('[data-equals]');
const previousOperandTextElement = document.querySelector('[data-previous-oprrand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
// create instance
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

//add event to the numberButtons
numberButtons.forEach(button => {
  button.addEventListener('click', ()=>{
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
});
//add event to the operandButtons
operationButtons.forEach(button => {
  button.addEventListener('click', ()=>{
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
});
//add event to the equalsButton
equalsButton.addEventListener('click', ()=>{
  calculator.compute();
  calculator.updateDisplay();
});
//add event to the allClearButton
allClearButton.addEventListener('click', ()=>{
  calculator.clear();
  calculator.updateDisplay();
});
//add event to the deleteButton
deleteButton.addEventListener('click', ()=>{
  calculator.delete();
  calculator.updateDisplay();
});
