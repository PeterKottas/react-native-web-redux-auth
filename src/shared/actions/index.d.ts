import { Action } from 'redux';
import FinalUser from './../FinalUser';
export declare function userExpired(): {
    type: string;
};
export declare function redirectSuccess(user: FinalUser): {
    type: string;
    payload: FinalUser;
};
export declare function userFound(user: FinalUser): {
    type: string;
    payload: FinalUser;
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
