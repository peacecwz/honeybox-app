import * as React from 'react';
import {Text} from 'react-native';
import HomeContext from '../../../contexts/home/context';
import {Divider, TopNavigation} from '@ui-kitten/components';
import t from '../../../utils/i18n';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <HomeContext.Consumer>
        {state => (
          <React.Fragment>
            <TopNavigation alignment={'center'} title={t('Home')} />
            <Divider />
            <Text>Home Screen</Text>
          </React.Fragment>
        )}
      </HomeContext.Consumer>
    );
  }
}
