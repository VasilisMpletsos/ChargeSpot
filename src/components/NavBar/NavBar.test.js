import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Navbar from './NavBar';
import Button from "@material-ui/core/Button";
import { useSelector } from 'react-redux'

configure({adapter: new Adapter()})

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn()
  }));

let mockAppState = {
    auth: false,
    userName: 'Vasilis',
    prefersDark: false,
    accountBalance: 0,
    lastCharges: [],
    products: [],
}

describe('<Navbar/>',()=>{

    beforeEach(() => {
        useSelector.mockImplementation(callback => {
          return callback(mockAppState);
        });
      });

      afterEach(() => {
        useSelector.mockClear();
      });

    it('Should have only 2 buttons if authenticated',()=>{
        mockAppState = {
            ...mockAppState,
            auth: true
        }
        let component = shallow(<Navbar/>);
        expect(component.find(Button)).toHaveLength(2)
    })

    it('Should have only 2 buttons if authenticated',()=>{
        mockAppState = {
            ...mockAppState,
            auth: false
        }
        let component = shallow(<Navbar/>);
        expect(component.find(Button)).toHaveLength(4)
    })
});