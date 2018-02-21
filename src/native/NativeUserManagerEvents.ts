import Timer from './Timer';
import Event from './Event';
import { User } from 'oidc-client';
import { NativeUserManagerSettings } from './NativeUserManager';

const DefaultAccessTokenExpiringNotificationTime = 60000;

export class NativeUserManagerEvents {
    private _config: NativeUserManagerSettings;

    private _accessTokenExpiring: Timer;
    private _accessTokenExpired: Timer;

    private _userLoaded: Event;
    private _userUnloaded: Event;
    private _userSignedOut: Event;
    private _userSessionChanged: Event;
    private _silentRenewError: Event;

    constructor(config: NativeUserManagerSettings) {
        this._config = {
            ...config,
            accessTokenExpiringNotificationTime: config.accessTokenExpiringNotificationTime ?
                config.accessTokenExpiringNotificationTime
                :
                DefaultAccessTokenExpiringNotificationTime
        };

        this._userLoaded = new Event();
        this._userUnloaded = new Event();
        this._silentRenewError = new Event();
        this._userSignedOut = new Event();
        // this._userSessionChanged = new Event("User session changed");

        this._accessTokenExpiring = new Timer();
        this._accessTokenExpired = new Timer();
    }

    public load(user: User, raiseEvent: boolean = true) {

        this.cancelTimers();

        // only register events if there's an access token where we care about expiration
        if (user.access_token) {
            let duration = user.expires_in;

            if (duration > 0) {
                // only register expiring if we still have time
                let expiring = duration - this._config.accessTokenExpiringNotificationTime;
                if (expiring <= 0) {
                    expiring = 1;
                }
                this._accessTokenExpiring.init(expiring);
            }

            // always register expired. if it's negative, it will still fire
            let expired = duration + 1;
            this._accessTokenExpired.init(expired);
        }

        if (raiseEvent) {
            this._userLoaded.raise(user);
        }
    }

    public unload() {
        this.cancelTimers();
        this._userUnloaded.raise();
    }

    public addAccessTokenExpiring(cb: Function) {
        this._accessTokenExpiring.addHandler(cb);
    }

    public removeAccessTokenExpiring(cb: Function) {
        this._accessTokenExpiring.removeHandler(cb);
    }

    public addAccessTokenExpired(cb: Function) {
        this._accessTokenExpired.addHandler(cb);
    }

    public removeAccessTokenExpired(cb: Function) {
        this._accessTokenExpired.removeHandler(cb);
    }

    public addUserLoaded(cb: Function) {
        this._userLoaded.addHandler(cb);
    }
    public removeUserLoaded(cb: Function) {
        this._userLoaded.removeHandler(cb);
    }

    public addUserUnloaded(cb: Function) {
        this._userUnloaded.addHandler(cb);
    }
    public removeUserUnloaded(cb: Function) {
        this._userUnloaded.removeHandler(cb);
    }

    public addSilentRenewError(cb: Function) {
        this._silentRenewError.addHandler(cb);
    }
    public removeSilentRenewError(cb: Function) {
        this._silentRenewError.removeHandler(cb);
    }

    /*_raiseSilentRenewError(e) {
        this._silentRenewError.raise(e);
    }*/

    public addUserSignedOut(cb: Function) {
        this._userSignedOut.addHandler(cb);
    }
    public removeUserSignedOut(cb: Function) {
        this._userSignedOut.removeHandler(cb);
    }

    /*_raiseUserSignedOut(e) {
        this._userSignedOut.raise(e);
    }*/

    public addUserSessionChanged(cb: Function) {
        this._userSessionChanged.addHandler(cb);
    }

    public removeUserSessionChanged(cb: Function) {
        this._userSessionChanged.removeHandler(cb);
    }

    /*_raiseUserSessionChanged(e) {
        this._userSessionChanged.raise(e);
    }*/

    private cancelTimers() {
        this._accessTokenExpiring.cancel();
        this._accessTokenExpired.cancel();
    }
}