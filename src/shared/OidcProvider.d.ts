/// <reference types="react" />
import * as React from 'react';
import { Store } from 'redux';
import { UserManager } from 'oidc-client';
import { NativeUserManager } from '../native/NativeUserManager';
export interface OidcProviderProps {
    userManager: UserManager;
    nativeUserManager: NativeUserManager;
    store: Store<any>;
}
declare class OidcProvider extends React.Component<OidcProviderProps> {
    private userManager;
    private nativeUserManager;
    constructor(props: OidcProviderProps);
    componentWillMount(): void;
    componentWillUnmount(): void;
    render(): React.ReactElement<any>;
    private onUserLoaded(user);
    private onSilentRenewError(error);
    private onAccessTokenExpired();
    private onUserUnloaded();
    private onAccessTokenExpiring();
    private onUserSignedOut();
}
export default OidcProvider;
