import { Action } from 'redux';
import FinalUser from './../FinalUser';
import {
  USER_EXPIRED,
  REDIRECT_SUCCESS,
  USER_FOUND,
  SILENT_RENEW_ERROR,
  USER_EXPIRING,
  SESSION_TERMINATED,
  LOADING_USER,
  USER_SIGNED_OUT,
  LOAD_USER_ERROR
} from '../constants';

// dispatched when the existing user expired
export function userExpired() {
  return {
    type: USER_EXPIRED
  };
}

// dispatched after a successful redirect callback
export function redirectSuccess(user: FinalUser) {
  return {
    type: REDIRECT_SUCCESS,
    payload: user
  };
}

// dispatched when a user has been found in storage
export function userFound(user: FinalUser) {
  return {
    type: USER_FOUND,
    payload: user
  };
}

// dispatched when silent renew fails
// payload: the error
export function silentRenewError(error: Error) {
  return {
    type: SILENT_RENEW_ERROR,
    payload: error
  };
}

// dispatched when the user is logged out
export function sessionTerminated() {
  return {
    type: SESSION_TERMINATED
  };
}

// dispatched when the user is expiring (just before a silent renew is triggered)
export function userExpiring() {
  return {
    type: USER_EXPIRING
  };
}

// dispatched when a new user is loading
export function loadingUser() {
  return {
    type: LOADING_USER
  };
}

export function userSignedOut() {
  return {
    type: USER_SIGNED_OUT
  };
}

export function loadUserError() {
  return {
    type: LOAD_USER_ERROR
  };
}

export interface ActionBaseType extends Action {
    // tslint:disable-next-line:no-any
    payload: any;
} 