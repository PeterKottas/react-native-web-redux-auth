import { User } from 'oidc-client';
import { NativeUserManagerSettings } from './NativeUserManager';
export declare class NativeUserManagerEvents {
    private _config;
    private _accessTokenExpiring;
    private _accessTokenExpired;
    private _userLoaded;
    private _userUnloaded;
    private _userSignedOut;
    private _userSessionChanged;
    private _silentRenewError;
    constructor(config: NativeUserManagerSettings);
    load(user: User, raiseEvent?: boolean): void;
    unload(): void;
    addAccessTokenExpiring(cb: Function): void;
    removeAccessTokenExpiring(cb: Function): void;
    addAccessTokenExpired(cb: Function): void;
    removeAccessTokenExpired(cb: Function): void;
    addUserLoaded(cb: Function): void;
    removeUserLoaded(cb: Function): void;
    addUserUnloaded(cb: Function): void;
    removeUserUnloaded(cb: Function): void;
    addSilentRenewError(cb: Function): void;
    removeSilentRenewError(cb: Function): void;
    addUserSignedOut(cb: Function): void;
    removeUserSignedOut(cb: Function): void;
    addUserSessionChanged(cb: Function): void;
    removeUserSessionChanged(cb: Function): void;
    private cancelTimers;
}
