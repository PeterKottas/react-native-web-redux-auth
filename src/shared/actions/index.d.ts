import { User } from 'oidc-client';
import { Action } from 'redux';
export declare function userExpired(): {
    type: string;
};
export declare function redirectSuccess(user: User): {
    type: string;
    payload: User;
};
export declare function userFound(user: User): {
    type: string;
    payload: User;
};
export declare function silentRenewError(error: Error): {
    type: string;
    payload: Error;
};
export declare function sessionTerminated(): {
    type: string;
};
export declare function userExpiring(): {
    type: string;
};
export declare function loadingUser(): {
    type: string;
};
export declare function userSignedOut(): {
    type: string;
};
export declare function loadUserError(): {
    type: string;
};
export interface ActionBaseType extends Action {
    payload: any;
}
