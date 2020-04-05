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
import {Platform} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import t from '../../utils/i18n';

export interface Props {
  navigation: any;
}

export default class LoginContainer extends BaseContainer<Props, LoginState> {
  constructor(props: any) {
    super(props);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.register = this.register.bind(this);
    this.signInWithApple = this.signInWithApple.bind(this);
    this.signInWithAnonymously = this.signInWithAnonymously.bind(this);
    this.signInWithGoogle = this.signInWithGoogle.bind(this);
    this.signInWithEmail = this.signInWithEmail.bind(this);
    this.state = {
      passwordVisible: false,
      isEnabledAppleSignIn: Platform.OS === 'ios',
      email: '',
      password: '',
      actions: {
        register: this.register,
        forgotPassword: this.forgotPassword,
        signInWithApple: this.signInWithApple,
        signInWithAnonymously: this.signInWithAnonymously,
        signInWithGoogle: this.signInWithGoogle,
        signInWithEmail: this.signInWithEmail,
      },
    };
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

      if (firebase.auth().currentUser) {
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
        this.alert(t('Kullanıcı adı veya parolanız boş bırakılmamalı.'));
        return;
      }

      await firebase.auth().signInWithEmailAndPassword(email, password);
      if (firebase.auth().currentUser) {
        await this.redirectToMain();
      } else {
        this.alert(t('Kullanıcı adı veya parolanız hatalıdır.'));
      }
    } catch (e) {
      this.alert('Cannot sign in to app');
    }
  }

  async signInWithAnonymously() {
    try {
      const result = await firebase.auth().signInAnonymously();
      if (result && firebase.auth().currentUser) {
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

      if (userCredential && firebase.auth().currentUser) {
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
        <LoginScreen {...this.props} />
      </LoginContext.Provider>
    );
  }
}
