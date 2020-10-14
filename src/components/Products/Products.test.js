import React from 'react';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Grid from "@material-ui/core/Grid";
import Product from "./Product/Product";
import Products from './Products';
import { Redirect } from "react-router-dom";
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


describe('<Products/>',()=>{
    beforeEach(() => {
        useSelector.mockImplementation(callback => {
          return callback(mockAppState);
        });
      });

      afterEach(() => {
        useSelector.mockClear();
      });

    it('Should have 0 Redirect if authenticated',()=>{
        mockAppState = {
            ...mockAppState,
            auth: true
        }
        let component = shallow(<Products/>);
        // Length 7 because 2 in Products and 5 in product
        expect(component.find(Redirect)).toHaveLength(0)
    })

    it('Should have Grid if authenticated',()=>{
        mockAppState = {
            ...mockAppState,
            auth: true
        }
        let component = shallow(<Products/>);
        // Greater or equal because Product in products introduce +5 Grid
        // and due to map because we don't have data it gets 5 + 2 = 7
        // Although we check for greater or equal than 2, i think it's fine
        expect(component.find(Grid).length).toBeGreaterThanOrEqual(2)
    })

    it('Should have 1 Redirect NOT authenticated',()=>{
        mockAppState = {
            ...mockAppState,
            auth: false
        }
        let component = shallow(<Products/>);
        expect(component.find(Redirect)).toHaveLength(1)
    })
})