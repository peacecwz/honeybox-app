import {createContext} from 'react';
import ChallengeDetailState from './state';

const ChallengeDetailContext = createContext<ChallengeDetailState>(
  new ChallengeDetailState(),
);
export default ChallengeDetailContext;
