import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from "@material-ui/core/Button";
import { useSelector } from 'react-redux';
import SettingsDrawer from './SettingsDrawer';


configure({adapter: new Adapter()})

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
  }));

let mockAppState = {
    auth: false,
    userName: '',
    prefersDark: false,
    accountBalance: 0,
    lastCharges: [],
    products: [],
}

describe('<SettingsDrawer/>',()=>{

    beforeEach(() => {
        useSelector.mockImplementation((callback) => {
          return callback(mockAppState);
        });
      });

      afterEach(() => {
        useSelector.mockClear();
      });

    it('Should have 9 Buttons if authenticated',()=>{
        mockAppState = {
            ...mockAppState,
            auth: true
        }
        let component = shallow(<SettingsDrawer/>);
        expect(component.find(Button)).toHaveLength(9)
    })

    it('Should have 5 Buttons if NOT authenticated',()=>{
        mockAppState = {
            ...mockAppState,
            auth: false
        }
        let component = shallow(<SettingsDrawer/>);
        expect(component.find(Button)).toHaveLength(5)
    })
  })