import { ActionBaseType } from '../actions';
import FinalUser from './../FinalUser';
export interface AuthState {
    user: FinalUser;
    isLoadingUser: boolean;
}
export default function reducer(state: AuthState, action: ActionBaseType): AuthState;
