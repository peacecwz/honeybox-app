import React from 'react';
import {View, Text} from 'react-native';

export default class EventsScreen extends React.Component {
  private navigation: any;

  constructor(props: any) {
    super(props);
    this.navigation = props.navigation;
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Events Screen</Text>
      </View>
    );
  }
}
