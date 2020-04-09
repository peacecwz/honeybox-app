import React from 'react';
import {ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {Card, Divider, List, Text, TopNavigation} from '@ui-kitten/components';
import {ImageOverlay} from '../../../components/image-overlay';
import {Challenge} from '../../../contexts/challenges/list/state';
import ChallengesContext from '../../../contexts/challenges/list/context';
import {getImage} from '../../../utils/image-utils';
import t from '../../../utils/i18n';

export default class ChallengesScreen extends React.Component {
  renderItem(
    info: ListRenderItemInfo<Challenge>,
    onPress: any,
  ): React.ReactElement {
    return (
      <Card style={styles.item} onPress={() => onPress(info.item.id)}>
        <ImageOverlay
          style={styles.itemImage}
          source={getImage(info.item.image)}>
          <Text style={styles.itemTitle} category="h2" status="control">
            {info.item.title}
          </Text>
          <Text style={styles.itemDescription} category="s1" status="control">
            {info.item.description}
          </Text>
        </ImageOverlay>
      </Card>
    );
  }

  render() {
    return (
      <ChallengesContext.Consumer>
        {state => (
          <React.Fragment>
            <TopNavigation
              alignment={'center'}
              leftControl={<View />}
              title={t('Challenges')}
              rightControls={<View />}
            />
            <Divider />
            <List
              style={styles.list}
              contentContainerStyle={styles.listContent}
              data={state.challenges}
              renderItem={(item: ListRenderItemInfo<Challenge>) =>
                this.renderItem(item, state.actions.goToChallengeDetail)
              }
            />
          </React.Fragment>
        )}
      </ChallengesContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  item: {
    marginVertical: 8,
    height: 220,
  },
  itemImage: {
    ...StyleSheet.absoluteFillObject,
    height: 220,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  itemTitle: {
    zIndex: 1,
  },
  itemDescription: {
    zIndex: 1,
    marginVertical: 16,
  },
  itemFooter: {
    position: 'absolute',
    flexDirection: 'row',
    left: 8,
    bottom: 8,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});
