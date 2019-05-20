import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Calculator from './components/Calculator/Calculator';

describe('App', () => {
  let wrapper;
  // A setup method from Jest - executed before each 'it' block
  beforeEach(() => wrapper = shallow(<App />));

  /**
   *  Should be the first test in the file, just after beforeEach.
   *  They are worth including since they will quickly alert you of
   *  any expected changes to a rendered component.
   */ 
  it('should render correctly', () => expect(wrapper).toMatchSnapshot());

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('should render the Calculator Component', () => {
    expect(wrapper.containsMatchingElement(<Calculator />)).toEqual(true);
  })
});