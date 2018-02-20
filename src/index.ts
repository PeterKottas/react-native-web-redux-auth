import createOidcMiddleware from './oidcMiddleware';

// redux-oidc components
export { default as createUserManager } from './helpers/createUserManager';
export { default as processSilentRenew } from './helpers/processSilentRenew';
export { default as loadUser } from './helpers/loadUser';
export { default as CallbackComponent } from './CallbackComponent';
export { default as reducer } from './reducer/reducer';
export { default as OidcProvider } from './OidcProvider';

// constants
export { USER_EXPIRED } from './constants';
export { REDIRECT_SUCCESS } from './constants';
export { USER_FOUND } from './constants';
export { SILENT_RENEW_ERROR } from './constants';
export { SESSION_TERMINATED } from './constants';
export { USER_EXPIRING } from './constants';
export { LOADING_USER } from './constants';
export { USER_SIGNED_OUT } from './constants';
export { LOAD_USER_ERROR } from './constants';

// actions
export { userExpired } from './actions';
export { redirectSuccess } from './actions';
export { userFound } from './actions';
export { silentRenewError } from './actions';
export { sessionTerminated } from './actions';
export { userExpiring } from './actions';
export { loadingUser } from './actions';
export { userSignedOut } from './actions';

export default createOidcMiddleware;
