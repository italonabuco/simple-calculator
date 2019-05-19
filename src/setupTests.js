import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

//Create React App Runs setupTests.js file before each test, so it will exeute and properly configure Enzyme.
configure({adapter: new Adapter() });