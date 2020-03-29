import {createContext} from 'react';
import RegisterState from './state';

const RegisterContext = createContext<RegisterState>(new RegisterState());
export default RegisterContext;
