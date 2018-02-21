import { AuthorizeResult } from 'react-native-app-auth';
import { FinalUser } from '../..';
export declare class UserMapping {
    static FromAppAuthToOidc(user: AuthorizeResult, scopes: string[]): FinalUser;
}
