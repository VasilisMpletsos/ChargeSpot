import { call , put } from 'redux-saga/effects';
import * as actionTypes from '../actions/actions';
import { fetchToken , fetchUser , fetchProfile } from './api';  

export function* login(action){
  try{

    localStorage.removeItem('jwtToken')

    // get token!
    let auth;
    const data = yield call(fetchToken, action.name, action.password)
    if (data.detail===undefined){
      auth = true;
      let token = data.access;
      localStorage.setItem("jwtToken", 'Bearer ' + token);
     }else{
      auth = false;
      console.log(data.detail)
    }

    if(auth){
      let user = yield call(fetchUser)
      if(user.results!==undefined){
        user = user.results[0]
      }
      yield put({type: actionTypes.setUserName, name: user.username})
      yield put({type: actionTypes.AUTHENTICATE})
      let profile = yield call(fetchProfile,user.profile)
      yield put({type: actionTypes.setAccountBalance, account: profile.account})
      if(action.prefersDark!==profile.prefersDark){
        yield put({type: actionTypes.darkMode})
      }
    }
  }catch(error){
    console.log(error)
  }

}

