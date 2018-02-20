import { User } from 'oidc-client';
export declare type UserSettings = Pick<User, 'id_token' | 'session_state' | 'access_token' | 'token_type' | 'scope' | 'profile' | 'expires_at' | 'state'> & {
    refresh_token?: string;
};
export default class NativeUser implements User {
    id_token: string;
    session_state: any;
    access_token: string;
    token_type: string;
    scope: string;
    profile: any;
    expires_at: number;
    state: any;
    refresh_token: string;
    static fromStorageString(storageString: string): NativeUser;
    constructor(config: UserSettings);
    readonly expires_in: number;
    readonly expired: boolean;
    readonly scopes: string[];
    toStorageString(): string;
}
