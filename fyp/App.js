import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './components/navigationSplashscreen';



export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <AppNavigator/>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#C7E4C7',

    padding: 8,
  },

});
