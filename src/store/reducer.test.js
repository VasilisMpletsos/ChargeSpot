import reducer from './reducer';
import * as actionsType from './actions';

describe('Auth reducer',()=>{

    let state = {
        auth: false,
        userName: "",
        prefersDark: false,
        accountBalance: 0,
        lastCharges: [],
      }

    it('Should return the initial state',()=>{
        /*
        * The initial state is undefined
        * and we pass {} empty object for type
        * so we don't go into any of the reducer
        * functions and just get the initial state back
        * Have fun this is Javascrit!
        */
        expect(reducer(undefined, {})).toEqual(state)
    })

    it('Should return the state with auth true',()=>{
        // Now i run AUTHENTICATE so i should get auth TRUE
        expect(reducer(undefined, {type: actionsType.AUTHENTICATE})).toEqual({
            ...state,
            auth: true
        })
    })

    it('Should return the state with auth false',()=>{
        // Now i run DEAUTHENTICATE so i should get back auth FALSE
        expect(reducer({...state,auth: true}, {type: actionsType.DEAUTHENTICATE})).toEqual({
            ...state,
            auth: false
        })
    })

    it('Should return the state with prefersDark true',()=>{
        // Now i run darkMode so i should get back prefersDark true
        expect(reducer(undefined, {type: actionsType.darkMode})).toEqual({
            ...state,
            prefersDark: true
        })
    })

    it('Should return the state with prefersDark false',()=>{
        // Now i run darkMode with prefers dark true at the start 
        // so i should get back prefersDark false
        expect(reducer({...state,prefersDark:true}, {type: actionsType.darkMode})).toEqual({
            ...state,
            prefersDark: false
        })
    })

    it('Should return the state with prefersDark false',()=>{
        // Now i run darkModeFalse so i should get back prefersDark false
        expect(reducer({...state,prefersDark:true}, {type: actionsType.darkModeFalse})).toEqual({
            ...state,
            prefersDark: false
        })
    })

    it('Should return proper account Balance value',()=>{
        expect(reducer(undefined, {type: actionsType.setAccountBalance, account: 10})).toEqual({
            ...state,
            accountBalance: 10
        })
    })

    it('Should return proper username string',()=>{
        expect(reducer(undefined, {type: actionsType.setUserName, name: 'Vmpletsos'})).toEqual({
            ...state,
            userName: 'Vmpletsos'
        })
    })

    it('Should return proper username string',()=>{
        expect(reducer(undefined, {type: actionsType.setLastCharges, lastCharges: [{typeA: 5, port: 10},{typeC: 2, port: 7}]})).toEqual({
            ...state,
            lastCharges: [{typeA: 5, port: 10},{typeC: 2, port: 7}]
        })
    })

})