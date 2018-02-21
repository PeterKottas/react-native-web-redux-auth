import { AuthorizeResult } from 'react-native-app-auth';
import NativeUser from '../NativeUser';
import { FinalUser } from '../..';

export class UserMapping {
    public static FromAppAuthToOidc(user: AuthorizeResult, scopes: string[]): FinalUser {
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