import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import ActivitiesContext from '../../../contexts/activities/context';
import {Agenda} from 'react-native-calendars';
import {
  Button,
  Divider,
  Input,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import t from '../../../utils/i18n';
import {
  EmailIcon,
  EyeIcon,
  EyeOffIcon,
  PersonIcon,
  PlusIcon,
} from '../../../components/icons';
import Modal from 'react-native-modal';
import {ActivityDetail} from "../../../models/activityDetail";

export default class ActivitiesScreen extends React.Component {
  state = {
    showModal: false,
  };

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
        <Text>{t('This is empty date!')}</Text>
      </View>
    );
  }

  rowHasChanged(r1: any, r2: any) {
    return r1.name !== r2.name;
  }

  renderPopup() {
    return (
      <Modal
        isVisible={this.state.showModal}
        onBackdropPress={() => {
          this.setState({
            showModal: false,
          });
        }}>
        <View style={styles.content}>
          <Button
            onPress={() => {
              this.setState({
                showModal: false,
              });
            }}>
            {t('Close')}
          </Button>
        </View>
      </Modal>
    );
  }

  render() {
    return (
      <ActivitiesContext.Consumer>
        {state => (
          <React.Fragment>
            <TopNavigation
              rightControls={
                <TopNavigationAction
                  icon={PlusIcon}
                  onPress={() => {
                    this.setState({
                      showModal: true,
                    });
                  }}
                />
              }
              alignment={'center'}
              title={t('Activities')}
            />
            <Divider />
            <Agenda
              items={state.items}
              loadItemsForMonth={state.actions.loadItems}
              renderItem={this.renderItem.bind(this)}
              renderEmptyDate={this.renderEmptyDate.bind(this)}
              rowHasChanged={this.rowHasChanged.bind(this)}
            />
            {this.renderPopup()}
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
  button: {
    marginTop: 4,
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  formInput: {
    marginTop: 16,
  },
});
