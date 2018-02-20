// tslint:disable:variable-name
import { User } from 'oidc-client';
export type UserSettings = Pick<User, 'id_token' | 'session_state' | 'access_token' | 'token_type' | 'scope' | 'profile' | 'expires_at' | 'state'> & {
    refresh_token?: string;
};

export default class NativeUser implements User {
    public id_token: string;
    // tslint:disable-next-line:no-any
    public session_state: any;
    public access_token: string;
    public token_type: string;
    public scope: string;
    // tslint:disable-next-line:no-any
    public profile: any;
    public expires_at: number;
    // tslint:disable-next-line:no-any
    public state: any;
    public refresh_token: string;

    public static fromStorageString(storageString: string) {
        return new NativeUser(JSON.parse(storageString));
    }

    constructor(config: UserSettings) {
        if (!config) {
            throw Error('Tried to create NativeUser and passed null or undefined as config');
        }
        this.id_token = config.id_token;
        this.session_state = config.session_state;
        this.access_token = config.access_token;
        this.token_type = config.token_type;
        this.scope = config.scope;
        this.profile = config.profile;
        this.expires_at = config.expires_at;
        this.state = config.state;
        this.refresh_token = config.refresh_token;
    }

    public get expires_in() {
        if (this.expires_at) {
            return this.expires_at - Date.now();
        }
        return undefined;
    }

    public get expired() {
        let expires_in = this.expires_in;
        if (expires_in !== undefined) {
            return expires_in <= 0;
        }
        return undefined;
    }

    public get scopes() {
        return (this.scope || '').split(' ');
    }

    public toStorageString() {
        return JSON.stringify({
            id_token: this.id_token,
            session_state: this.session_state,
            access_token: this.access_token,
            token_type: this.token_type,
            scope: this.scope,
            profile: this.profile,
            expires_at: this.expires_at,
            refresh_token: this.refresh_token
        });
    }
}