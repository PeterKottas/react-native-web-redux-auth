import { NativeUserManagerSettings, NativeUserManager } from '../NativeUserManager';

export default function createNativeUserManager(config?: NativeUserManagerSettings) {
    return new NativeUserManager(config);
}