import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SplashScreen from './SplashScreen';
import NavigationBar from './navigation_bar';


const AppNavigator = createStackNavigator(
    {
        Splash: SplashScreen,
        Main: {
            screen: NavigationBar,
            navigationOptions: {
              header: null, // Hide the header for the main screen
            },
            params: { tasks: [] } 
          },
    },
    {
        initialRouteName: 'Splash',
        headerMode: 'none',
    }
);

export default createAppContainer(AppNavigator);
