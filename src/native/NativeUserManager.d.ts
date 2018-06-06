import { NativeUserManagerEvents } from './NativeUserManagerEvents';
import { AuthConfiguration } from 'react-native-app-auth';
import FinalUser from './../shared/FinalUser';
export declare type NativeUserManagerSettings = AuthConfiguration & {
    accessTokenExpiringNotificationTime?: number;
    appStorePrefix?: string;
};
export declare class NativeUserManager {
    private _config;
    private _events;
    private _userStore;
    constructor(config: NativeUserManagerSettings);
    readonly events: NativeUserManagerEvents;
    getUser(): Promise<any>;
    signIn(): Promise<FinalUser>;
    private _getUser;
    private _storeUser;
}
