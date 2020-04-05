import * as React from 'react';
import ChallengesState, {Challenge} from '../../contexts/challenges/list/state';
import ChallengesContext from '../../contexts/challenges/list/context';
import ChallengesScreen from '../../screens/challenges/challenges.screen';
import database from '@react-native-firebase/database';
import BaseContainer from '../base-container';
import {ChallengeDetailRoutePath} from '../../routes/route.path';

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
    this.navigate(ChallengeDetailRoutePath, {
      challengeId: challengeId,
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
        image: require('../../../assets/background-images/sign-in.jpg'),
        date: '20.09.2019',
      }),
      new Challenge(null, {
        title: 'Deneme 2',
        description: 'Deneme açıklama',
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        image: require('../../../assets/background-images/sign-in.jpg'),
        date: '20.09.2019',
      }),
      new Challenge(null, {
        title: 'Deneme 3',
        description: 'Deneme açıklama',
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        image: require('../../../assets/background-images/sign-in.jpg'),
        date: '20.09.2019',
      }),
      new Challenge(null, {
        title: 'Deneme 4',
        description: 'Deneme açıklama',
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        image: require('../../../assets/background-images/sign-in.jpg'),
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
