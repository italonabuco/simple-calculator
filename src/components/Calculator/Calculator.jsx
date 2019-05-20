import React, { Component } from 'react';
import './Calculator.css';
import Display from '../Display/Display';

class Calculator extends Component {

    state = {
        // value to be displayed in <Display />
        displayValue: '49',
        // values to be displayed in number <Keys />
        number: [],
        // values to be displayed in operator <Keys />
        operators: [],
        // operator selected for math operation
        selectedOperator: '',
        // stored value to use for math operation
        storedValue: ''
    };

    callOperator = () => {
        console.log('call operation');
    }

    setOperator = () => {
        console.log('set operation');
    }

    updateDisplay = () => {
        console.log('update display');
    }

    render(){
        // using destructuring 
        const { displayValue } = this.state;

        return(
            <div className="calculator-container">
                <Display displayValue={displayValue} />
            </div>
        );
    }
}

export default Calculator;