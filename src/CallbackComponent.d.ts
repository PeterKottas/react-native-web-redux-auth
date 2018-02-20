import * as React from 'react';
import { UserManager, User } from 'oidc-client';
export interface CallbackComponentProps {
    userManager: UserManager;
    successCallback: (user: User) => void;
    errorCallback: (error: Error) => void;
}
declare class CallbackComponent extends React.Component<CallbackComponentProps> {
    static propTypes: {
        children: any;
        userManager: any;
        successCallback: any;
        errorCallback: any;
    };
    componentDidMount(): void;
    render(): React.ReactElement<any>;
    private onRedirectSuccess(user);
    private onRedirectError(error);
}
export default CallbackComponent;
