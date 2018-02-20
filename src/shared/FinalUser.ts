import NativeUser from '../native/NativeUser';
import { User } from 'oidc-client';

type FinalUser = User & NativeUser;

export default FinalUser;