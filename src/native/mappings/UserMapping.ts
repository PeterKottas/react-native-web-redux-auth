import { AuthorizeResult } from 'react-native-app-auth';
import { User } from 'oidc-client';
import NativeUser from '../NativeUser';

export class UserMapping {
    public static FromAppAuthToOidc(user: AuthorizeResult, scopes: string[]): User {
        return new NativeUser({
            id_token: user.idToken,
            refresh_token: user.refreshToken,
            session_state: '',
            access_token: user.accessToken,
            token_type: user.tokenType,
            scope: scopes.join(' '),
            profile: undefined,
            expires_at: new Date(user.accessTokenExpirationDate).getTime(),
            state: ''
        });
    }
}