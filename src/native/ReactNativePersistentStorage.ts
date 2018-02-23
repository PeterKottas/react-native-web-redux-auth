import { AsyncStorage } from 'react-native';

export interface ReactNativePersistentStorageConfig {
    prefix?: string;
}

export default class ReactNativePersistentStorage {
    private _prefix: (key: string) => string;
    private _unprefix: (key: string) => string;

    constructor(config: ReactNativePersistentStorageConfig) {
        if (!config) {
            throw new Error('Must provide config for ReactNativePersistentStorage');
        }
        let prefix = config.prefix;
        if (!prefix || prefix === '') {
            prefix = 'react-native-web-redux-auth.';
        }
        this._prefix = key => prefix + key;
        this._unprefix = prefixedKey => prefixedKey.substr(prefix.length);
    }

    public set(key: string, value: Object) {
        const prefixedKey = this._prefix(key);

        return AsyncStorage.setItem(prefixedKey, JSON.stringify(value));
    }

    public get(key: string): Promise<Object> {
        const prefixedKey = this._prefix(key);
        return AsyncStorage.getItem(prefixedKey).then((res) => {
            if (res === null) {
                return Promise.resolve(undefined);
            }

            const value = JSON.parse(res);
            return value;
        });
    }

    public remove(key: string): Promise<void> {
        const prefixedKey = this._prefix(key);

        return AsyncStorage.getItem(prefixedKey).then((res) => {
            if (res === null) {
                return Promise.resolve(undefined);
            }

            const removedValue = JSON.parse(res);
            return AsyncStorage.removeItem(prefixedKey).then(() => removedValue);
        });
    }

    public getAllKeys(): Promise<string[]> {
        return new Promise((resolve) => {
            AsyncStorage.getAllKeys((error, keys) => {
                const unprefixedKeys = keys.map(prefixedKey => this._unprefix(prefixedKey));

                resolve(unprefixedKeys);
            });
        });
    }
}