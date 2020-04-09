import {createContext} from 'react';
import ActivitiesState from './state';

const ActivitiesContext = createContext<ActivitiesState>(new ActivitiesState());
export default ActivitiesContext;
