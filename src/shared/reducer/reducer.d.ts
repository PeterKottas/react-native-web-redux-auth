import { User } from 'oidc-client';
import { ActionBaseType } from '../actions';
export interface AuthState {
    user: User;
    isLoadingUser: boolean;
}
export default function reducer(state: AuthState, action: ActionBaseType): AuthState;
