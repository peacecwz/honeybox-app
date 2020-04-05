import * as React from 'react';
import {Alert} from 'react-native';
import t from '../utils/i18n';
import {} from '@react-navigation/stack';

export default class BaseContainer<TProp, TState> extends React.Component<
  TProp,
  TState
> {
  private readonly route: any;
  private readonly navigationManager: any;
  constructor(props: any) {
    super(props);
    this.navigationManager = props.navigation;
    this.route = props.route;
  }

  getParameter(key: string) {
    return this.route.params[key];
  }

  navigateWithoutHistory(key: string) {
    this.navigationManager.reset({
      index: 0,
      routes: [{name: key}],
    });
  }

  goBack() {
    this.navigationManager.goBack();
  }

  navigate(key: string, args?: any) {
    this.navigationManager.navigate(key, args || {});
  }

  push(key: string) {
    this.navigationManager.push(key);
  }

  alert(message: string) {
    Alert.alert(t('HoneyApp'), t(message));
  }
}
