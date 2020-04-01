import {createContext} from 'react';
import BrowserState from './state';

const BrowserContext = createContext<BrowserState>(new BrowserState());
export default BrowserContext;
