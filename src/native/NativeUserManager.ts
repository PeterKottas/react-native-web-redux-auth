import { NativeUserManagerEvents } from './NativeUserManagerEvents';
import { authorize, AuthConfiguration } from 'react-native-app-auth';
import ReactNativePersistentStorage from './ReactNativePersistentStorage';
import { USER_STORE_KEY } from './constants';
import { AsyncStorage } from 'react-native';
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
            prefix: config.appStorePrefix,
            asyncStorage: AsyncStorage
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

    public async signIn() {
        try {
            const result = await authorize(this._config);
            const mappedUser = UserMapping.FromAppAuthToOidc(result, this._config.scopes);
            this._storeUser(mappedUser);
            this._events.load(mappedUser, true);
            return mappedUser;
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error('Unable to authorize user', e);
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