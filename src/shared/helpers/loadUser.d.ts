import { Store } from 'redux';
import { UserManager } from 'oidc-client';
import FinalUser from './../FinalUser';
export declare function setReduxStore<S>(newStore: Store<S>): void;
export declare function getReduxStore(): any;
export declare function getUserCallback(user: FinalUser): FinalUser;
export declare function errorCallback(error: Error): void;
export default function loadUser<S>(store: Store<S>, userManager: UserManager): Promise<void | FinalUser>;
