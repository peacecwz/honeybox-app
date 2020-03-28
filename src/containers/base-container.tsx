import * as React from 'react';
export default class BaseContainer<TProp, TState> extends React.Component<
  TProp,
  TState
> {
  private readonly navigationManager: any;
  constructor(props: any) {
    super(props);
    this.navigationManager = props.navigation;
  }

  navigate(key: string, args: any) {
    this.navigationManager.navigate(key);
  }

  push(key: string) {
    this.navigationManager.push(key);
  }
}
