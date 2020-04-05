import {createContext} from 'react';
import ProfileState from './state';

const ProfileContext = createContext<ProfileState>(new ProfileState());
export default ProfileContext;
