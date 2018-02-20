import * as React from 'react';
import { Store } from 'redux';
import { UserManager } from 'oidc-client';
export interface OidcProviderProps {
    userManager: UserManager;
    store: Store<{
        [key: string]: object;
    }>;
}
declare class OidcProvider extends React.Component<OidcProviderProps> {
    private userManager;
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
