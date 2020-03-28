import {createContext} from 'react';
import HomeState from './state';

const HomeContext = createContext<HomeState>(new HomeState());
export default HomeContext;
