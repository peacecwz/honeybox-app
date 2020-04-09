import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import ActivitiesContext from '../../../contexts/activities/context';
import {Agenda} from 'react-native-calendars';
import {ActivityDetail} from '../../../contexts/activities/state';
import {Divider, TopNavigation} from '@ui-kitten/components';
import t from '../../../utils/i18n';

export default class ActivitiesScreen extends React.Component {
  renderItem(item: ActivityDetail) {
    return (
      <TouchableOpacity
        style={[styles.item, {height: 50}]}
        onPress={() => Alert.alert(item.content)}>
        <Text>{item.content}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1: any, r2: any) {
    return r1.name !== r2.name;
  }

  render() {
    return (
      <ActivitiesContext.Consumer>
        {state => (
          <React.Fragment>
            <TopNavigation
              alignment={'center'}
              leftControl={<View />}
              title={t('Activities')}
              rightControls={<View />}
            />
            <Divider />
            <Agenda
              items={state.items}
              loadItemsForMonth={state.actions.loadItems}
              renderItem={this.renderItem.bind(this)}
              renderEmptyDate={this.renderEmptyDate.bind(this)}
              rowHasChanged={this.rowHasChanged.bind(this)}
            />
          </React.Fragment>
        )}
      </ActivitiesContext.Consumer>
    );
  }
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
