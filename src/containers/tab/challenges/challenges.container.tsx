import * as React from 'react';
import ChallengesState, {Challenge} from '../../../contexts/challenges/list/state';
import ChallengesContext from '../../../contexts/challenges/list/context';
import ChallengesScreen from '../../../screens/tab/challenges/challenges.screen';
import database from '@react-native-firebase/database';
import BaseContainer from '../../base-container';
import {AppRoutePath, ChallengeDetailRoutePath} from '../../../routes/route.path';

export interface Props {}

export default class ChallengesContainer extends BaseContainer<
  Props,
  ChallengesState
> {
  constructor(props: any) {
    super(props);
    const challengesState = new ChallengesState();
    challengesState.actions.goToChallengeDetail = this.goToChallengeDetail.bind(
      this,
    );
    this.state = challengesState;
  }

  goToChallengeDetail(challengeId: any) {
    this.navigate(AppRoutePath, {
      params: {
        challengeId: challengeId,
      },
      screen: ChallengeDetailRoutePath,
    });
  }

  async initData() {
    const challengesRequest = await database().ref('/challenges');

    const data = [
      new Challenge(null, {
        title: 'Deneme 1',
        description: 'Deneme açıklama',
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        image:
          'https://firebasestorage.googleapis.com/v0/b/honeyapp-bca3e.appspot.com/o/-M47C4Or2LFP5X5l1I-N?alt=media&token=9dde7042-8d58-49ab-aa9c-02c2c5260ead',
        date: '20.09.2019',
      }),
      new Challenge(null, {
        title: 'Deneme 2',
        description: 'Deneme açıklama',
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        image:
          'https://firebasestorage.googleapis.com/v0/b/honeyapp-bca3e.appspot.com/o/-M47C4Or2LFP5X5l1I-N-497c03e3-f261-445b-85f4-8523b35bd0d5-93A84467-2BFA-4DEA-ADB5-41F9D85F1F23.jpg?alt=media&token=3ebd3e93-8339-4585-a03c-0eef11a599a3',
        date: '20.09.2019',
      }),
      new Challenge(null, {
        title: 'Deneme 3',
        description: 'Deneme açıklama',
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        image:
          'https://firebasestorage.googleapis.com/v0/b/honeyapp-bca3e.appspot.com/o/-M47C4Or2LFP5X5l1I-N-e49a9b98-72dd-465e-891c-0ad462aceacc-800E029F-8D0B-477B-ABB9-ABCCE22EACD8.jpg?alt=media&token=ce074202-2a38-46ce-81c2-bd890540efc1',
        date: '20.09.2019',
      }),
      new Challenge(null, {
        title: 'Deneme 4',
        description: 'Deneme açıklama',
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        image:
          'https://firebasestorage.googleapis.com/v0/b/honeyapp-bca3e.appspot.com/o/-M47C6uh4SQAZ3g7bOOR?alt=media&token=5ed6c528-0b61-4dbe-bc52-750bcdd68ea7',
        date: '20.09.2019',
      }),
    ];

    for (const challenge of data) {
      const pushRef = challengesRequest.push();

      await pushRef.set(challenge);
    }
  }

  async componentDidMount() {
    const challengesRequest = await database()
      .ref('/challenges')
      .once('value');

    const result = challengesRequest.val();
    const challenges: Array<Challenge> = [];
    Object.keys(result).forEach(key => {
      const challenge = result[key];
      challenges.push(new Challenge(key, challenge));
    });

    this.setState({
      challenges: challenges,
    });
  }

  render() {
    return (
      <ChallengesContext.Provider value={this.state}>
        <ChallengesScreen />
      </ChallengesContext.Provider>
    );
  }
}
