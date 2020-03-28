import React from 'react';
import {View, Text, Button} from 'react-native';
import HomeContext from '../../contexts/home/context';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <HomeContext.Consumer>
        {state => (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Home Screen</Text>
            <Button title={'Log out'} onPress={() => state.actions.logOut()} />
          </View>
        )}
      </HomeContext.Consumer>
    );
  }
}
