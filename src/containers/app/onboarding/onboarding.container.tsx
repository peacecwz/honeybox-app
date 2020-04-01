import * as React from 'react';
import BaseContainer from '../../base-container';
import OnBoardingScreen from '../../../screens/app/onboarding.screen';

export interface Props {}
export interface State {}

export default class OnBoardingContainer extends BaseContainer<Props, State> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return <OnBoardingScreen />;
  }
}
