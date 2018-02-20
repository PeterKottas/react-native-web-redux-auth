declare module 'react-native-app-auth' {
    export interface AuthConfig {
        issuer: string;
        clientId: string;
        redirectUrl: string;
        scopes: string[];
        additionalParameters?: { [name: string]: any };
    }

    export interface AuthorizeResult {
        accessToken: string;
        accessTokenExpirationDate: string;
        additionalParameters?: { [name: string]: any };
        idToken: string;
        refreshToken: string;
        tokenType: string;
    }

    export interface RevokeConfig {
        tokenToRevoke: string;
        sendClientId?: boolean;
    }

    export interface RefreshConfig {
        refreshToken: string;
    }

    export function authorize(config: AuthConfig): Promise<AuthorizeResult>;
    export function revoke(config: AuthConfig, revokeConfig: RevokeConfig): Promise<AuthorizeResult>;
    export function refresh(config: AuthConfig, refreshConfig: RefreshConfig): Promise<AuthorizeResult>;
}