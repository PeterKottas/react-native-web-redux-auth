import { AsyncStorage } from 'react-native';

export interface ReactNativePersistentStorageConfig {
    prefix?: string;
    asyncStorage: AsyncStorage;
}

export default class ReactNativePersistentStorage {
    private _asyncStorage: AsyncStorage;
    private _prefix: (key: string) => string;
    private _unprefix: (key: string) => string;

    constructor(config: ReactNativePersistentStorageConfig) {
        if (!config) {
            throw new Error('Must provide config for ReactNativePersistentStorage');
        }
        if (config.asyncStorage === null) {
            throw new Error('Must provide AsyncStorage from react-native');
        }
        let prefix = config.prefix;
        if (!prefix || prefix === '') {
            prefix = 'oidc.';
        }
        this._prefix = key => prefix + key;
        this._unprefix = prefixedKey => prefixedKey.substr(prefix.length);
        this._asyncStorage = config.asyncStorage;
    }

    public set(key: string, value: Object) {
        const prefixedKey = this._prefix(key);

        return this._asyncStorage.setItem(prefixedKey, JSON.stringify(value));
    }

    public get(key: string): Promise<Object> {
        const prefixedKey = this._prefix(key);
        return this._asyncStorage.getItem(prefixedKey).then((res) => {
            if (res === null) {
                return Promise.resolve(undefined);
            }

            const value = JSON.parse(res);
            return value;
        });
    }

    public remove(key: string): Promise<void> {
        const prefixedKey = this._prefix(key);

        return this._asyncStorage.getItem(prefixedKey).then((res) => {
            if (res === null) {
                return Promise.resolve(undefined);
            }

            const removedValue = JSON.parse(res);
            return this._asyncStorage.removeItem(prefixedKey).then(() => removedValue);
        });
    }

    public getAllKeys(): Promise<string[]> {
        return new Promise((resolve) => {
            this._asyncStorage.getAllKeys((error, keys) => {
                const unprefixedKeys = keys.map(prefixedKey => this._unprefix(prefixedKey));

                resolve(unprefixedKeys);
            });
        });
    }
}