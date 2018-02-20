import { Middleware } from 'redux';
import { User, UserManager } from 'oidc-client';
export declare let storedUser: any;
export declare let nextMiddleware: any;
export declare function setNext(newNext: Middleware): void;
export declare function getNext(): Middleware;
export declare function setStoredUser(user: User): void;
export declare function removeStoredUser(): void;
export declare function getUserCallback(user: User): void;
export declare function errorCallback(error: Error): void;
export declare const middlewareHandler: (userManager: UserManager) => Middleware;
export default function createOidcMiddleware(userManager: UserManager): (store: any) => (next: any) => (action: any) => void;
