import { ContactsOutlined } from '@material-ui/icons';
import { call , put } from 'redux-saga/effects';
import * as actionTypes from '../actions/actions';
import { fetchToken , fetchUser , fetchProfile , fetchHistory, fetchSpot} from './api';  

export function* login(action){
  try{

    console.log(localStorage.getItem('jwtToken'))
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

      console.log(user)
      yield put({type: actionTypes.setUserName, name: user.username})
      yield put({type: actionTypes.AUTHENTICATE})

      //Profile
      let profile = yield call(fetchProfile,user.profile)
      yield put({type: actionTypes.setAccountBalance, account: profile.account})
      if(action.prefersDark!==profile.prefersDark){
        yield put({type: actionTypes.darkMode})
      }

      //History

      let historyAll=[];
      var historyData;
      for (historyData of user.history){
        let data = yield call(fetchHistory,historyData)
        let name = yield call(fetchSpot,data.location)
        yield data.location = name.locationText
        // Or if you want name of spot!
        // yield data.location = name.name
        yield historyAll.push(data);
      }
      console.log(historyAll);
      if(historyAll.length!==0){
        yield put({type: actionTypes.setLastCharges, lastCharges: historyAll})
      }
    }
  }catch(error){
    console.log(error)
  }

}

