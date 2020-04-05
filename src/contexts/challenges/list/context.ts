import {createContext} from 'react';
import ChallengesState from './state';

const ChallengesContext = createContext<ChallengesState>(new ChallengesState());
export default ChallengesContext;
