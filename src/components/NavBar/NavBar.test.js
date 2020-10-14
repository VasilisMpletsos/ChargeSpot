import React from 'react';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Navbar from './NavBar';
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { useSelector } from 'react-redux'


configure({adapter: new Adapter()})

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn()
  }));

let mockAppState = {
    auth: false,
    userName: '',
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

    it('Should have 2 Buttons if authenticated',()=>{
        mockAppState = {
            ...mockAppState,
            auth: true
        }
        let component = shallow(<Navbar/>);
        expect(component.find(Button)).toHaveLength(2)
    })

    it('Should have 4 Buttons if not authenticated',()=>{
        mockAppState = {
            ...mockAppState,
            auth: false
        }
        let component = shallow(<Navbar/>);
        expect(component.find(Button)).toHaveLength(4)
    })

    it('Should have 2 Menu Items if not authenticated',()=>{
      mockAppState = {
          ...mockAppState,
          auth: false
      }
      let component = shallow(<Navbar/>);
      expect(component.find(MenuItem)).toHaveLength(2)
    })

    it('Should have 3 Menu Items if authenticated',()=>{
      mockAppState = {
          ...mockAppState,
          auth: true
      }
      let component = shallow(<Navbar/>);
      expect(component.find(MenuItem)).toHaveLength(3)
    })

    it('Should have Username if authenticated',()=>{
      mockAppState = {
          ...mockAppState,
          auth: true,
          userName: 'Vasilis',
      }
      let component = shallow(<Navbar/>);
      expect(component.find('.navName').text()).toBe('Vasilis')
      expect(component.find('.navName').text()).toContain('Vasi')
      expect(component.find('.navName')).toHaveLength(1)
     })

    it('Should not have div for username if not authenticated',()=>{
      mockAppState = {
          ...mockAppState,
          auth: false,
      }
      let component = shallow(<Navbar/>);
      expect(component.find('.navName')).toHaveLength(0)
    })

  })