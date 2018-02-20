import { AsyncStorage } from 'react-native';
export interface ReactNativePersistentStorageConfig {
    prefix?: string;
    asyncStorage: AsyncStorage;
}
export default class ReactNativePersistentStorage {
    private _asyncStorage;
    private _prefix;
    private _unprefix;
    constructor(config: ReactNativePersistentStorageConfig);
    set(key: string, value: Object): Promise<void>;
    get(key: string): Promise<Object>;
    remove(key: string): Promise<void>;
    getAllKeys(): Promise<string[]>;
}
