import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Widget from './widget';
import Icon from 'react-native-vector-icons/FontAwesome5';


const HomeScreen = () => {

  const navigation = useNavigation();

  const goToNoteTaking = () => {
    navigation.navigate('NoteTaking');
  };

  return (
    <View style={styles.container}>
      <Widget></Widget>
      <TouchableOpacity
        style={styles.roundButton}
        onPress={goToNoteTaking} 
        >
          <Icon name="sticky-note" size={30} color="#516451" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    backgroundColor:"#C7E4C7",
  },
  roundButton: {
    position: 'absolute',
    bottom: 20, // To place the button above the taskbar
    right: 20, // To place the button at the bottom right
    borderRadius: 30,
    width: 60, 
    height: 60, 
    borderColor: '#000',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default HomeScreen;