import { takeEvery } from 'redux-saga/effects';
import { login } from './auth';
import * as actionTypes from '../actions/actions';

export function* watchLogin(){
    yield takeEvery(actionTypes.LOGIN, login)
}
