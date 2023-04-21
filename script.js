// 2nd; constructor takes all inputs for & functions for calculator; tells where to
// display text for calc
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        // this <--- gives way to set elements inside calc class
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    // clearing diff vars
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    // deleting single number element
    delete() {

        // slice(0,-1) <--- signifies the removal of the last number entered into the currentOperand
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    // what happens onclick for number elements; takes in the particular number 
    // selected by user (number) aka passing number selected
    appendNumber(number) {

        // restricting ability to pass multiple decimals
        if (number === '.' && this.currentOperand.includes('.')) return

        // toString <--- changes operand & number to strings i order to append numbers; without it
        // js will add the 2 vars (1+1=2, instead of 1+1=11)
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    // what happens onclick for operation elements; takes in the particular operation 
    // selected by user (operation) aka passing operation selected
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }

        // tells calc which func to use when it computes value
        this.operation = operation

        // tells calc we're done typing current number, so recycle to previous operand
        this.previousOperand = this.currentOperand

        // clears out current operand value
        this.currentOperand = ''
    }

    // takes values in calc & compute a single val to display
    compute() {

        // let computation <--- will be the result of the compute function
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        // isNaN <--- is not a number; ---> || <--- or
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break    
            
            // if user attempts symbol not matching a symbol in the operation, then the 
            // operation is invalid & no computaion is done
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const intergerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let intergerDisplay
        if (isNaN(intergerDigits)) {
            intergerDisplay = ''
        } else{
            intergerDisplay = intergerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${intergerDisplay}.${decimalDigits}`
        } else{
            return intergerDisplay
        }
    }

    // updates the calc display
    updateDisplay() {

        // displays current operand
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            // displays concatination of the previous operand & the chosen operation;
            // aka both are displayed in the calc
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        } else{
            this.previousOperandTextElement.innerText = ''
        }
    }
}

// 1st get different vars
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

// creating a new calc
// operand elements passed into new calc
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {

        // appendNumber <--- add number of associated button to previous number in calc app
        calculator.appendNumber(button.innerText)
        
        // updateDisplay <--- updates display to include appended number
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {

        // chooseOperation <---add operation associated with button to calc app
        calculator.chooseOperation(button.innerText)

        // updateDisplay <--- updates display to reflect selected operation 
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})