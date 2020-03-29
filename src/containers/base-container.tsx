import * as React from 'react';
import {Alert} from 'react-native';
import t from '../utils/i18n';
export default class BaseContainer<TProp, TState> extends React.Component<
  TProp,
  TState
> {
  private readonly navigationManager: any;
  constructor(props: any) {
    super(props);
    this.navigationManager = props.navigation;
  }

  navigate(key: string, args?: any) {
    this.navigationManager.navigate(key);
  }

  push(key: string) {
    this.navigationManager.push(key);
  }

  alert(message: string) {
    Alert.alert(t('HoneyApp'), t(message));
  }
}
