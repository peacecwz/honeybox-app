import * as React from 'react';
import BaseContainer from '../base-container';
import BrowserState from '../../contexts/support/browser/state';
import BrowserScreen from '../../screens/support/browser.screen';
import BrowserContext from '../../contexts/support/browser/context';
export interface Props {}

export default class BrowserContainer extends BaseContainer<
  Props,
  BrowserState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      url: this.getParameter('url'),
    };
  }

  render() {
    return (
      <BrowserContext.Provider value={this.state}>
        <BrowserScreen />
      </BrowserContext.Provider>
    );
  }
}
