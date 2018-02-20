import { userFound, userExpired, loadUserError, loadingUser } from '../actions';
import { Store } from 'redux';
import { User, UserManager } from 'oidc-client';

// stores the redux store here to be accessed by all functions
let reduxStore;

// helper function to set the redux store (for testing)
export function setReduxStore<S>(newStore: Store<S>) {
  reduxStore = newStore;
}

// helper function to get the redux store (for testing)
export function getReduxStore() {
  return reduxStore;
}

// callback function called when the user has been loaded
export function getUserCallback(user: User) {
  if (user && !user.expired) {
    reduxStore.dispatch(userFound(user));
  } else if (!user || (user && user.expired)) {
    reduxStore.dispatch(userExpired());
  }
  return user;
}

// error callback called when the userManager's loadUser() function failed
export function errorCallback(error: Error) {
  // tslint:disable-next-line:no-console
  console.error(`redux-oidc: Error in loadUser() function: ${error.message}`);
  reduxStore.dispatch(loadUserError());
}

// function to load the current user into the store
// NOTE: use only when silent renew is configured
export default function loadUser<S>(store: Store<S>, userManager: UserManager) {
  if (!store || !store.dispatch) {
    throw new Error('redux-oidc: You need to pass the redux store into the loadUser helper!');
  }

  if (!userManager || !userManager.getUser) {
    throw new Error('redux-oidc: You need to pass the userManager into the loadUser helper!');
  }

  reduxStore = store;
  store.dispatch(loadingUser());

  return userManager.getUser()
    .then(getUserCallback)
    .catch(errorCallback);
}
