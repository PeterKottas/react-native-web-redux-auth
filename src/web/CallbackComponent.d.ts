import * as React from 'react';
import { UserManager, User } from 'oidc-client';
export interface CallbackComponentProps {
    userManager: UserManager;
    successCallback?: (user: User) => void;
    errorCallback?: (error: Error) => void;
}
declare class CallbackComponent extends React.Component<CallbackComponentProps> {
    componentDidMount(): void;
    render(): React.ReactNode;
    private onRedirectSuccess;
    private onRedirectError;
}
export default CallbackComponent;
