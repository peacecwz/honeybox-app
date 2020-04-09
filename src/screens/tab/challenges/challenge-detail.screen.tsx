import * as React from 'react';
import ChallengeDetailContext from '../../../contexts/challenges/detail/context';
import {ScrollView, View} from 'react-native';
import {
  Button,
  Divider,
  Layout,
  StyleService,
  Text,
  TopNavigation,
} from '@ui-kitten/components';
import t from '../../../utils/i18n';
import {getImage} from '../../../utils/image-utils';
import FastImage from 'react-native-fast-image';

export default class ChallengeDetailScreen extends React.Component {
  render() {
    return (
      <ChallengeDetailContext.Consumer>
        {state => (
          <React.Fragment>
            <TopNavigation alignment={'center'} title={state.challenge.title} />
            <Divider />
            <ScrollView>
              <Layout style={styles.header} level="1">
                <Text style={styles.titleLabel} category="h4">
                  {state.challenge.title}
                </Text>
                <Text style={styles.descriptionLabel} category="s1">
                  {state.challenge.description}
                </Text>
                <FastImage
                  style={styles.image}
                  source={getImage(state.challenge.image)}
                />
                <Text style={styles.contentLabel}>
                  {state.challenge.content}
                </Text>
                <View style={styles.authoringContainer}>
                  <Text appearance="hint" category="p2">
                    {'By HoneyApp'}
                  </Text>
                  <Text
                    style={styles.dateLabel}
                    appearance="hint"
                    category="p2">
                    {state.challenge.date}
                  </Text>
                </View>
                <Button
                  disabled={!state.canSubmitToChallenge}
                  style={styles.doneButton}
                  onPress={() => state.actions.sendPhoto(state.challenge)}>
                  {t('Start the challenge')}
                </Button>
              </Layout>
            </ScrollView>
          </React.Fragment>
        )}
      </ChallengeDetailContext.Consumer>
    );
  }
}

const styles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
    paddingBottom: 8,
  },
  list: {
    flex: 1,
  },
  header: {
    marginBottom: 8,
  },
  image: {
    height: 240,
  },
  titleLabel: {
    marginHorizontal: 24,
    marginVertical: 16,
  },
  descriptionLabel: {
    margin: 24,
  },
  contentLabel: {
    margin: 24,
  },
  authoringContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
  },
  dateLabel: {
    marginHorizontal: 8,
  },
  commentInputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: 'text-basic-color',
  },
  commentInput: {
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 20,
  },
  doneButton: {
    marginHorizontal: 24,
    marginTop: 24,
    flex: 1,
  },
});
