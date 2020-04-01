import * as React from 'react';
import WebView from 'react-native-webview';
import BrowserContext from '../../contexts/support/browser/context';

export default class BrowserScreen extends React.Component {
  render() {
    return (
      <BrowserContext.Consumer>
        {state => <WebView source={{uri: state.url}} />}
      </BrowserContext.Consumer>
    );
  }
}
