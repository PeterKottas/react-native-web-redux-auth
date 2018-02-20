import { userExpired, userFound, loadingUser, loadUserError } from './actions';
import { USER_EXPIRED, LOADING_USER, USER_FOUND } from './constants';
import { Middleware, MiddlewareAPI, Dispatch, Action } from 'redux';
import { UserManager } from 'oidc-client';
import FinalUser from './FinalUser';

// store the user here to prevent future promise calls to getUser()
export let storedUser = null;
// store the next middleware here so it can be accessed by the getUserCallback
export let nextMiddleware = null;

// helper function to set the stored next middleware (for testing)
export function setNext(newNext: Middleware) {
    nextMiddleware = newNext;
}

// a function to get the next middleware (for testing)
export function getNext(): Middleware {
    return nextMiddleware;
}

// helper function to set the stored user manually (for testing)
export function setStoredUser(user: FinalUser) {
    storedUser = user;
}

// helper function to remove the stored user manually (for testing)
export function removeStoredUser() {
    storedUser = null;
}

// callback function to the userManager's getUser
export function getUserCallback(user: FinalUser) {
    if (!user || user.expired) {
        nextMiddleware(userExpired());
    } else {
        storedUser = user;
        nextMiddleware(userFound(user));
    }
}

// callback for the userManager's getUser.catch
export function errorCallback(error: Error) {
    // tslint:disable-next-line:no-console
    console.error(`redux-oidc: Error loading user in oidcMiddleware: ${error.message}`);
    nextMiddleware(loadUserError());
}

// the middleware handler function
export const middlewareHandler = (userManager: UserManager): Middleware =>
    (api: MiddlewareAPI<void>) =>
        (next: Dispatch<void>) =>
            <A extends Action>(action: A) => {
                // prevent an infinite loop of dispatches of these action types (issue #30 & #63)
                if (action.type === USER_EXPIRED || action.type === LOADING_USER || action.type === USER_FOUND) {
                    return next(action);
                }

                nextMiddleware = next;

                if (!storedUser || storedUser.expired) {
                    next(loadingUser());
                    userManager.getUser()
                        .then(getUserCallback)
                        .catch(errorCallback);
                }
                return next(action);
            };

// the middleware creator function
export default function createOidcMiddleware(userManager: UserManager): Middleware {
    if (!userManager || !userManager.getUser) {
        throw new Error('You must provide a user manager!');
    }

    // the middleware
    return middlewareHandler(userManager);
}
