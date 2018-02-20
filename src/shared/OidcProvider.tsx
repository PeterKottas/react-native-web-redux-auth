import * as React from 'react';
import { userExpired, userFound, silentRenewError, sessionTerminated, userExpiring, userSignedOut } from './actions';
import { Store } from 'redux';
import { UserManager } from 'oidc-client';
import FinalUser from './FinalUser';
import { NativeUserManager } from '../native/NativeUserManager';
import { Platform } from 'react-native';

export interface OidcProviderProps {
    userManager: UserManager;
    nativeUserManager: NativeUserManager;
    // tslint:disable-next-line:no-any
    store: Store<any>;
}

class OidcProvider extends React.Component<OidcProviderProps> {
    private userManager: UserManager;
    private nativeUserManager: NativeUserManager;

    constructor(props: OidcProviderProps) {
        super(props);
        this.userManager = props.userManager;
        this.nativeUserManager = props.nativeUserManager;
        this.onUserLoaded = this.onUserLoaded.bind(this);
        this.onSilentRenewError = this.onSilentRenewError.bind(this);
        this.onAccessTokenExpired = this.onAccessTokenExpired.bind(this);
        this.onAccessTokenExpiring = this.onAccessTokenExpiring.bind(this);
        this.onUserUnloaded = this.onUserUnloaded.bind(this);
        this.onUserSignedOut = this.onUserSignedOut.bind(this);
    }

    public componentWillMount() {
        // register the event callbacks
        if (Platform.OS === 'web') {
            this.userManager.events.addUserLoaded(this.onUserLoaded);
            this.userManager.events.addSilentRenewError(this.onSilentRenewError);
            this.userManager.events.addAccessTokenExpired(this.onAccessTokenExpired);
            this.userManager.events.addAccessTokenExpiring(this.onAccessTokenExpiring);
            this.userManager.events.addUserUnloaded(this.onUserUnloaded);
            this.userManager.events.addUserSignedOut(this.onUserSignedOut);
        } else {
            this.nativeUserManager.events.addUserLoaded(this.onUserLoaded);
        }
    }

    public componentWillUnmount() {
        // unregister the event callbacks
        if (Platform.OS === 'web') {
            this.userManager.events.removeUserLoaded(this.onUserLoaded);
            this.userManager.events.removeSilentRenewError(this.onSilentRenewError);
            this.userManager.events.removeAccessTokenExpired(this.onAccessTokenExpired);
            this.userManager.events.removeAccessTokenExpiring(this.onAccessTokenExpiring);
            this.userManager.events.removeUserUnloaded(this.onUserUnloaded);
            this.userManager.events.removeUserSignedOut(this.onUserSignedOut);
        } else {
            this.nativeUserManager.events.removeUserLoaded(this.onUserLoaded);
        }
    }

    public render() {
        return React.Children.only(this.props.children);
    }

    // event callback when the user has been loaded (on silent renew or redirect)
    private onUserLoaded(user: FinalUser) {
        this.props.store.dispatch(userFound(user));
    }

    // event callback when silent renew errored
    private onSilentRenewError(error: Error) {
        this.props.store.dispatch(silentRenewError(error));
    }

    // event callback when the access token expired
    private onAccessTokenExpired() {
        this.props.store.dispatch(userExpired());
    }

    // event callback when the user is logged out
    private onUserUnloaded() {
        this.props.store.dispatch(sessionTerminated());
    }

    // event callback when the user is expiring
    private onAccessTokenExpiring() {
        this.props.store.dispatch(userExpiring());
    }

    // event callback when the user is signed out
    private onUserSignedOut() {
        this.props.store.dispatch(userSignedOut());
    }
}

export default OidcProvider;
