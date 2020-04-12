import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Setting} from '../../../components/settings-section.component';
import {Divider, Layout, Toggle, TopNavigation} from '@ui-kitten/components';
import t from '../../../utils/i18n';
import ProfileContext from '../../../contexts/profile/context';

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <ProfileContext.Consumer>
        {state => (
          <React.Fragment>
            <TopNavigation alignment={'center'} title={t('Profile')} />
            <Divider />
            <Layout style={styles.container}>
              <ScrollView>
                <Setting
                  onPress={() => state.actions.goToBlog()}
                  style={[styles.setting, styles.section]}
                  hint={t('Blog')}
                />
                <Setting
                  onPress={() => state.actions.goToPrivacy()}
                  style={styles.setting}
                  hint={t('Privacy Policy')}
                />
                <Setting
                  onPress={() => state.actions.goToAboutUs()}
                  style={styles.setting}
                  hint={t('About Us')}
                />
                <Setting
                  onPress={() => state.actions.goToContactUs()}
                  style={styles.setting}
                  hint={t('Contact Us')}
                />
                <Setting
                  onPress={() => state.actions.goToSocial('facebook')}
                  style={[styles.setting, styles.section]}
                  hint={t('Facebook')}
                />
                <Setting
                  onPress={() => state.actions.goToSocial('twitter')}
                  style={styles.setting}
                  hint={t('Twitter')}
                />
                <Setting
                  onPress={() => state.actions.goToSocial('instagram')}
                  style={styles.setting}
                  hint={t('Instagram')}
                />
                <Setting
                  style={styles.setting}
                  hint={t('Enable Notifications')}
                  onPress={() => {}}>
                  <Toggle onChange={() => {}} />
                </Setting>
                <Setting
                  style={[styles.setting, styles.section]}
                  onPress={() => state.actions.logOut()}
                  hint={t('Log out')}
                />
              </ScrollView>
            </Layout>
          </React.Fragment>
        )}
      </ProfileContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  setting: {
    padding: 16,
  },
  section: {
    paddingTop: 32,
  },
});
