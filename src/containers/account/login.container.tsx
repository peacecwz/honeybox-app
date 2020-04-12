import * as React from 'react';
import LoginScreen from '../../screens/account/login.screen';
import AsyncStorage from '@react-native-community/async-storage';
import {
  ForgotPasswordRoutePath,
  MainRoutePath,
  RegisterRoutePath,
} from '../../routes/route.path';
import LoginContext from '../../contexts/account/login/context';
import LoginState from '../../contexts/account/login/state';
import {firebase} from '@react-native-firebase/auth';
import appleAuth, {
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';
import BaseContainer from '../base-container';
import {GoogleSignin} from '@react-native-community/google-signin';
import t from '../../utils/i18n';
import database from '@react-native-firebase/database';

export interface Props {}

export default class LoginContainer extends BaseContainer<Props, LoginState> {
  constructor(props: any) {
    super(props);
    const state = new LoginState();
    state.actions.forgotPassword = this.forgotPassword.bind(this);
    state.actions.register = this.register.bind(this);
    state.actions.signInWithApple = this.signInWithApple.bind(this);
    state.actions.signInWithAnonymously = this.signInWithAnonymously.bind(this);
    state.actions.signInWithGoogle = this.signInWithGoogle.bind(this);
    state.actions.signInWithEmail = this.signInWithEmail.bind(this);
    this.state = state;
  }

  componentDidMount() {
    GoogleSignin.configure({
      webClientId:
        '335438287916-rpb7ud3aqkvkkn3uqjnj3opmifjocea3.apps.googleusercontent.com',
      offlineAccess: true,
      iosClientId:
        '335438287916-umn51r80orl981bvb9qbgsudd04c2igh.apps.googleusercontent.com',
    });
  }

  async signInWithGoogle() {
    try {
      const {serverAuthCode, idToken} = await GoogleSignin.signIn();
      const credential = firebase.auth.GoogleAuthProvider.credential(
        idToken,
        serverAuthCode || '',
      );

      await firebase.auth().signInWithCredential(credential);

      const currentUser = this.getUser();
      if (currentUser) {
        const ref = database().ref(`/users/${currentUser.uid}`);

        const userData = await ref.once('value');
        if (!userData.exists()) {
          await ref.set({
            email: currentUser.email,
            userId: currentUser.uid,
            fullName: currentUser.displayName,
            birthDate: '',
          });
        }

        await this.redirectToMain();
      }
    } catch (e) {
      if (e.code !== '-5') {
        this.alert(t('Cannot sign in to app'));
      }
    }
  }

  async signInWithEmail() {
    try {
      const {email, password} = this.state;

      if (email === '' || password === '') {
        this.alert(t('Your email or password is missing'));
        return;
      }

      await firebase.auth().signInWithEmailAndPassword(email, password);
      if (this.getUser()) {
        await this.redirectToMain();
      } else {
        this.alert(t('Wrong your email address or password'));
      }
    } catch (e) {
      this.alert(t('Wrong your email address or password'));
    }
  }

  async signInWithAnonymously() {
    try {
      const result = await firebase.auth().signInAnonymously();
      const currentUser = this.getUser();
      if (result && currentUser) {
        const ref = database().ref(`/users/${currentUser.uid}`);

        const userData = await ref.once('value');
        if (!userData.exists()) {
          await ref.set({
            email: currentUser.email,
            userId: currentUser.uid,
            fullName: currentUser.displayName,
            birthDate: '',
          });
        }
        await this.redirectToMain();
      }
    } catch (e) {
      this.alert('Cannot sign in to app');
    }
  }

  async signInWithApple() {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: AppleAuthRequestOperation.LOGIN,
      requestedScopes: [
        AppleAuthRequestScope.EMAIL,
        AppleAuthRequestScope.FULL_NAME,
      ],
    });

    const {identityToken, nonce} = appleAuthRequestResponse;

    if (identityToken) {
      const appleCredential = firebase.auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );

      const userCredential = await firebase
        .auth()
        .signInWithCredential(appleCredential);

      const currentUser = this.getUser();
      if (userCredential && currentUser) {
        const ref = database().ref(`/users/${currentUser.uid}`);

        const userData = await ref.once('value');
        if (!userData.exists()) {
          await ref.set({
            email: currentUser.email,
            userId: currentUser.uid,
            fullName: currentUser.displayName,
            birthDate: '',
          });
        }
        await this.redirectToMain();
      }
    } else {
      this.alert('Cannot sign in to app');
    }
  }

  register() {
    this.navigate(RegisterRoutePath);
  }

  forgotPassword() {
    this.navigate(ForgotPasswordRoutePath);
  }

  async redirectToMain() {
    await AsyncStorage.setItem('isLoggedUser', 'true');
    this.navigateWithoutHistory(MainRoutePath);
  }

  render() {
    return (
      <LoginContext.Provider value={this.state}>
        <LoginScreen />
      </LoginContext.Provider>
    );
  }
}
