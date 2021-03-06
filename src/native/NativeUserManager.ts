import { NativeUserManagerEvents } from './NativeUserManagerEvents';
import { authorize, AuthConfiguration, revoke, BaseAuthConfiguration } from 'react-native-app-auth';
import ReactNativePersistentStorage from './ReactNativePersistentStorage';
import { USER_STORE_KEY } from './constants';
import { UserMapping } from './mappings/UserMapping';
import FinalUser from './../shared/FinalUser';

export type NativeUserManagerSettings = AuthConfiguration & {
    accessTokenExpiringNotificationTime?: number;
    appStorePrefix?: string;
};

export class NativeUserManager {
    private _config: NativeUserManagerSettings;
    private _events: NativeUserManagerEvents;
    private _userStore: ReactNativePersistentStorage;

    constructor(config: NativeUserManagerSettings) {
        this._events = new NativeUserManagerEvents(config);
        this._userStore = new ReactNativePersistentStorage({
            prefix: config.appStorePrefix
        });
        this._config = { ...config };
    }

    public get events() {
        return this._events;
    }

    public getUser() {
        return this._getUser().then(user => {
            if (user) {
                this._events.load(user, true);
            }
            return null;
        });
    }

    public async signOut() {
        try {
            const libConfig: BaseAuthConfiguration = (({
                clientId,
                clientSecret,
                issuer,
                scopes,
                redirectUrl,
                serviceConfiguration,
                additionalParameters,
                dangerouslyAllowInsecureHttpRequests
            }) => ({
                clientId,
                issuer,
                serviceConfiguration,
            }))(this._config);
            const user = await this._getUser();
            revoke(libConfig, { tokenToRevoke: user.access_token });
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error('Unable to signOut', e);
        }
    }

    public async signIn() {
        try {
            const libConfig: AuthConfiguration = (({
                clientId,
                clientSecret,
                issuer,
                scopes,
                redirectUrl,
                serviceConfiguration,
                additionalParameters,
                dangerouslyAllowInsecureHttpRequests
            }) => ({
                clientId,
                clientSecret,
                issuer,
                scopes,
                redirectUrl,
                serviceConfiguration,
                additionalParameters,
                dangerouslyAllowInsecureHttpRequests
            }))(this._config);
            const result = await authorize(libConfig);
            const mappedUser = UserMapping.FromAppAuthToOidc(result, this._config.scopes);
            this._storeUser(mappedUser);
            this._events.load(mappedUser, true);
            return mappedUser;
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error('Unable to signIn', e);
        }
    }

    private _getUser() {
        return this._userStore.get(USER_STORE_KEY).then(async (user: FinalUser) => {
            if (user) {
                return user;
            }
            return null;
        });
    }

    private _storeUser(user?: FinalUser) {
        if (user) {
            return this._userStore.set(USER_STORE_KEY, user);
        } else {
            return this._userStore.remove(USER_STORE_KEY);
        }
    }
}