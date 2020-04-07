import {createContext} from 'react';
import CalendarState from './state';

const CalendarContext = createContext<CalendarState>(new CalendarState());
export default CalendarContext;
