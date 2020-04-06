import * as React from 'react';
import ChallengeDetailState from '../../contexts/challenges/detail/state';
import ChallengeDetailContext from '../../contexts/challenges/detail/context';
import ChallengeDetailScreen from '../../screens/challenges/challenge-detail.screen';
import BaseContainer from '../base-container';
import database from '@react-native-firebase/database';
import {Challenge, Submission} from '../../contexts/challenges/list/state';
import storage from '@react-native-firebase/storage';
import {firebase} from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-picker';
import t from '../../utils/i18n';
import {getFilename} from '../../utils/url-utils';
import {v4 as uuidv4} from 'uuid';
import {Alert} from 'react-native';

export interface Props {}

export default class ChallengeDetailContainer extends BaseContainer<
  Props,
  ChallengeDetailState
> {
  constructor(props: any) {
    super(props);
    const challengeDetailState = new ChallengeDetailState();
    challengeDetailState.actions.sendPhoto = this.sendPhoto.bind(this);
    this.state = challengeDetailState;
  }

  async sendPhoto(challenge: Challenge) {
    if (!firebase.auth().currentUser) {
      return;
    }

    const options = {
      title: t('Select Avatar'),
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, async response => {
      if (response && response.uri) {
        const reference = storage().ref(
          `${challenge.id}-${uuidv4()}-${getFilename(response.uri)}`,
        );
        const result = await reference.putFile(response.uri);
        const userId = this.getUserId();

        if (!result) {
          this.alert(t('Your media cannot upload'));
          return;
        }

        const challengeReference = database().ref(
          `/challenges/${challenge.id}/submissions/${userId}`,
        );

        const challengeData = new Submission(null, {
          status: 'pending',
          isComplete: false,
          mediaUrl: await reference.getDownloadURL(),
        });

        await challengeReference.set(challengeData);
        Alert.alert(
          t('HoneyApp'),
          t(
            'We got your challenge request. We will send info about your challenge',
          ),
          [
            {
              onPress: () => this.goBack,
              text: t('Ok'),
            },
          ],
        );
      }
    });
  }

  async componentDidMount() {
    const challengeId = this.getParameter('challengeId');
    const request = await database()
      .ref(`/challenges/${challengeId}`)
      .once('value');

    const result = request.val();
    const challenge = new Challenge(challengeId, result);
    const userId = this.getUserId();
    const canSubmitToChallenge =
      challenge.submissions.filter(
        (submission: Submission) => submission.id === userId,
      ).length === 0;
    this.setState({
      challenge: challenge,
      canSubmitToChallenge: canSubmitToChallenge,
    });
  }

  render() {
    return (
      <ChallengeDetailContext.Provider value={this.state}>
        <ChallengeDetailScreen />
      </ChallengeDetailContext.Provider>
    );
  }
}
