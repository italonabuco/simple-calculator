import React from 'react';
import { mount, shallow } from 'enzyme';
import Calculator from './Calculator';
import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad';

describe('Calculator', () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<Calculator />));

    it('should render correctly', () => expect(wrapper).toMatchSnapshot());

    it('should render a <div />', () => {
        expect(wrapper.find('div').length).toEqual(1);
    });

    it('should render the Display and Keypad Components', () => {
        /**
         * containsAllMatchingElements
         * takes an array os elements and returns 'true' if all elements
         * are found in the DOM tree.
         */
        expect(wrapper.containsAllMatchingElements([
            <Display displayValue={wrapper.instance().state.displayValue} />,
            <Keypad 
                callOperator={wrapper.instance().callOperator}
                numbers={wrapper.instance().state.numbers}
                operators={wrapper.instance().state.operators}
                setOperator={wrapper.instance().setOperator}
                updateDisplay={wrapper.instance().updateDisplay}
            />
        ])).toEqual(true);
    });
});

describe('mounted Calculator', () => {
    let wrapper;
    
    /**
     *  use 'mount' instead of 'shallow'
     *  because we are testing the behavior of child components
     */
    beforeEach(() => wrapper = mount(<Calculator />));

    it('calls updateDisplay when a number key is clicked', () => {
        /**
         * (1) creating a 'spy' using Jest 'spyOn' method for
         * the calculator method we are testing.
         */
        const spy = jest.spyOn(wrapper.instance(), 'updateDisplay');
        /**
         * (2) calling 'forceUpdate' to re-render the 'instance'
         * within the test.
         */
        wrapper.instance().forceUpdate();
        expect(spy).toHaveBeenCalledTimes(0);
        /**
         * (3) using Enzyme's 'simulate' method on the corresponding
         * 'Key' to create the event.
         */
        wrapper.find('.number-key').first().simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
    });   
    
    it('calls setOperator when an operator is clicked', () => {
        const spy = jest.spyOn(wrapper.instance(), 'setOperator');
        wrapper.instance().forceUpdate();
        expect(spy).toHaveBeenCalledTimes(0);
        wrapper.find('.operator-key').first().simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('calls callOperator when the submit key is clicked', () => {
        const spy = jest.spyOn(wrapper.instance(), 'callOperator');
        wrapper.instance().forceUpdate();
        expect(spy).toHaveBeenCalledTimes(0);
        wrapper.find('.submit-key').first().simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
    });
});

describe('updateDisplay', () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<Calculator />));

    it('updates displayValue', () => {
        wrapper.instance().updateDisplay('9');
        expect(wrapper.state('displayValue')).toEqual('9');
    });

    it('concatenates displayValue', () => {
        wrapper.instance().updateDisplay('9');
        wrapper.instance().updateDisplay('9');
        expect(wrapper.state('displayValue')).toEqual('99');
    });

    it('removes leading "0" from displayValue', () => {
        wrapper.instance().updateDisplay('0');
        expect(wrapper.state('displayValue')).toEqual('0');
        wrapper.instance().updateDisplay('9');
        expect(wrapper.state('displayValue')).toEqual('9');
    });
    
    it('prevents multiple leading "0" from displayValue', () => {
        wrapper.instance().updateDisplay('0');
        wrapper.instance().updateDisplay('0');
        expect(wrapper.state('displayValue')).toEqual('0');
    });
    
    it('removes last char of displayValue', () => {
        wrapper.instance().updateDisplay('9');
        wrapper.instance().updateDisplay('0');
        wrapper.instance().updateDisplay('ce');
        expect(wrapper.state('displayValue')).toEqual('9');
    });

    it('prevents multiple instances of "." in displayValue', () => {
        wrapper.instance().updateDisplay('.');
        wrapper.instance().updateDisplay('.');
        expect(wrapper.state('displayValue')).toEqual('.');
    });

    it('will set displayValue to "0" if displayValue is equal to an empty string', () => {
        wrapper.instance().updateDisplay('ce');
        expect(wrapper.state('displayValue')).toEqual('0');
    });
});