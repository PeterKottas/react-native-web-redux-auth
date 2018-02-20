import { Store } from 'redux';
import { User, UserManager } from 'oidc-client';
export declare function setReduxStore<S>(newStore: Store<S>): void;
export declare function getReduxStore(): any;
export declare function getUserCallback(user: User): User;
export declare function errorCallback(error: Error): void;
export default function loadUser<S>(store: Store<S>, userManager: UserManager): Promise<void | User>;
