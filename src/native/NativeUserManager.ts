import { NativeUserManagerEvents } from './NativeUserManagerEvents';
import { AuthConfig, authorize } from 'react-native-app-auth';
import ReactNativePersistentStorage from './ReactNativePersistentStorage';
import { USER_STORE_KEY } from './constants';
import { User } from 'oidc-client';
import { AsyncStorage } from 'react-native';
import { UserMapping } from './mappings/UserMapping';

export interface NativeUserManagerSettings extends AuthConfig {
    accessTokenExpiringNotificationTime?: number;
    appStorePrefix?: string;
}

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
                this._events.load(user, false);
            } else {
                return null;
            }
        });
    }

    private _getUser() {
        return this._userStore.get(USER_STORE_KEY).then(async (user: User) => {
            if (user) {
                return user;
            }
            try {
                const result = await authorize(this._config);
                const mappedUser = UserMapping.FromAppAuthToOidc(result, this._config.scopes);
                this._storeUser(mappedUser);
            } catch (e) {
                // tslint:disable-next-line:no-console
                console.error('Unable to authorize user', e);
            }
            return null;
        });
    }

    private _storeUser(user?: User) {
        if (user) {
            return this._userStore.set(USER_STORE_KEY, user);
        } else {
            return this._userStore.remove(USER_STORE_KEY);
        }
    }
}