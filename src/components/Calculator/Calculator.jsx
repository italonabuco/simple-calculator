import React, { Component } from 'react';
import './Calculator.css';
import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad';

class Calculator extends Component {

    state = {
        // value to be displayed in <Display />
        displayValue: '0',
        // values to be displayed in number <Keys />
        numbers: ['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0', 'ce'],
        // values to be displayed in operator <Keys />
        operators: ['/', 'x', '-', '+'],
        // operator selected for math operation
        selectedOperator: '',
        // stored value to use for math operation
        storedValue: ''
    };

    callOperator = () => {
        console.log('call operation');
    }

    setOperator = value => {

        let { displayValue, selectedOperator, storedValue } = this.state;

        // check if a value is already present for selectedOperator
        if(selectedOperator === ''){
            // update storedValue to the value of displayValue
            storedValue = displayValue;

            // reset the value of displayValue to '0'
            displayValue = '0';

            // update the value of selectedOperator to the given value
            selectedOperator = value;
            
        }else{
            // if selectedOperator is not an empty string
            // update the value of selectedOperator to the given value
            selectedOperator = value;
        }

        this.setState({ displayValue, selectedOperator, storedValue });
    }

    updateDisplay = value => {

        let { displayValue } = this.state;

        // prevent multiple occurences of '.';
        if(value === '.' && displayValue.includes('.')) value = '';

        if(value === 'ce'){
            // delete last char in displayValue
            displayValue = displayValue.substr(0, displayValue.length - 1);
            // set displayValue to '0' if displayValue is empty string
            if(displayValue === '') displayValue = '0';
        }else{
            // replace displayValue with value if displayValue equal to '0'
            // else concatenate displayValue and value
            displayValue === '0' ? displayValue = value : displayValue += value;
        }
        this.setState({ displayValue });
    }

    render(){
        // using destructuring 
        const { displayValue, numbers, operators } = this.state;

        return(
            <div className="calculator-container">
                <Display displayValue={displayValue} />
                <Keypad 
                    callOperator={this.callOperator}
                    numbers={numbers}
                    operators={operators}
                    setOperator={this.setOperator}
                    updateDisplay={this.updateDisplay}
                />
            </div>
        );
    }
}

export default Calculator;