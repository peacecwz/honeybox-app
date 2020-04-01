import {createContext} from 'react';
import ForgotPasswordState from './state';

const ForgotPasswordContext = createContext<ForgotPasswordState>(new ForgotPasswordState());
export default ForgotPasswordContext;
