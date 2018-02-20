import { UserManager, UserManagerSettings } from 'oidc-client';

// Might need to fix this properly

let userManager;

try {
    userManager = require('oidc-client').UserManager;
} catch (a) {
  try {
    userManager = require('oidc-client-fetch').UserManager;
  } catch (b) {
    throw new Error(`redux-oidc: Couldn't find UserManager. Please install either 'oidc-client' or 'oidc-client-fetch'.`);
  }
}

export default function createUserManager(config?: UserManagerSettings) {
  return new userManager(config) as UserManager;
}
