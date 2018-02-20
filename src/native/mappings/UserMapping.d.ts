import { AuthorizeResult } from 'react-native-app-auth';
import { User } from 'oidc-client';
export declare class UserMapping {
    static FromAppAuthToOidc(user: AuthorizeResult, scopes: string[]): User;
}
