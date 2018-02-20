import createOidcMiddleware from './shared/oidcMiddleware';

// shared components
export { default as loadUser } from './shared/helpers/loadUser';
export { default as CallbackComponent } from './web/CallbackComponent';
export { default as reducer } from './shared/reducer/reducer';
export { default as OidcProvider } from './shared/OidcProvider';

// web components
export { default as createUserManager } from './web/helpers/createUserManager';
export { default as processSilentRenew } from './web/helpers/processSilentRenew';

// native components
export { default as createNativeUserManager } from './native/helpers/createNativeUserManager';

// shared constants
export { USER_EXPIRED } from './shared/constants';
export { REDIRECT_SUCCESS } from './shared/constants';
export { USER_FOUND } from './shared/constants';
export { SILENT_RENEW_ERROR } from './shared/constants';
export { SESSION_TERMINATED } from './shared/constants';
export { USER_EXPIRING } from './shared/constants';
export { LOADING_USER } from './shared/constants';
export { USER_SIGNED_OUT } from './shared/constants';
export { LOAD_USER_ERROR } from './shared/constants';

// native constants
export { USER_STORE_KEY } from './native/constants';

// actions
export { userExpired } from './shared/actions';
export { redirectSuccess } from './shared/actions';
export { userFound } from './shared/actions';
export { silentRenewError } from './shared/actions';
export { sessionTerminated } from './shared/actions';
export { userExpiring } from './shared/actions';
export { loadingUser } from './shared/actions';
export { userSignedOut } from './shared/actions';

export default createOidcMiddleware;
