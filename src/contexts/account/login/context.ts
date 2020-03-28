import {createContext} from 'react';
import LoginState from './state';

const LoginContext = createContext<LoginState>(new LoginState());
export default LoginContext;
