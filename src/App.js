import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './containers/HomeScreen';
import BlankScreen from './containers/BlankScreen';

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    Blank: {
        screen: BlankScreen
    }
}, {
    headerMode: 'none'
});

export default createAppContainer(AppNavigator);
