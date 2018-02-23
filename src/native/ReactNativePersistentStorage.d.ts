export interface ReactNativePersistentStorageConfig {
    prefix?: string;
}
export default class ReactNativePersistentStorage {
    private _prefix;
    private _unprefix;
    constructor(config: ReactNativePersistentStorageConfig);
    set(key: string, value: Object): Promise<void>;
    get(key: string): Promise<Object>;
    remove(key: string): Promise<void>;
    getAllKeys(): Promise<string[]>;
}
