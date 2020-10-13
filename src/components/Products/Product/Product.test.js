import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Product from './Product';
import CardHeader from "@material-ui/core/CardHeader";


configure({adapter: new Adapter()})

describe('<Product/>',()=>{
    let wrapper;
    const content = {
        typeA: 5,
        typeC: 2,
        wheel: 3,
        typeB: 10,
    }

    beforeEach(()=>{
        wrapper = shallow(<Product content/>);
    })

    it('Should have only 1 header',()=>{
        expect(wrapper.find(CardHeader)).toHaveLength(1)
    })
});