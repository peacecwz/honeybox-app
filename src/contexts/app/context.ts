import {createContext} from 'react';
import AppState from './state';

const AppContext = createContext<AppState>(new AppState());
export default AppContext;
