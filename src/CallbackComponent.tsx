import * as React from 'react';
import { UserManager, User } from 'oidc-client';

export interface CallbackComponentProps {
    userManager: UserManager;
    successCallback: (user: User) => void;
    errorCallback: (error: Error) => void;
}

class CallbackComponent extends React.Component<CallbackComponentProps> {
    public componentDidMount() {
        this.props.userManager.signinRedirectCallback()
            .then((user) => this.onRedirectSuccess(user))
            .catch((error) => this.onRedirectError(error));
    }

    public render() {
        return React.Children.only(this.props.children);
    }

    private onRedirectSuccess(user: User) {
        this.props.successCallback(user);
    }

    private onRedirectError(error: Error) {
        if (this.props.errorCallback) {
            this.props.errorCallback(error);
        } else {
            throw new Error(`Error handling redirect callback: ${error.message}`);
        }
    }
}

export default CallbackComponent;
