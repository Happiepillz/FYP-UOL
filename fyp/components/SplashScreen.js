import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const logo = require('../assets/logo.png');
    const motivationalPhrases = [
      "Believe in yourself and all that you are.",
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      "The only limit to our realization of tomorrow will be our doubts of today.",
      "The future belongs to those who believe in the beauty of their dreams.",
      "Don't watch the clock; do what it does. Keep going.",
      // Add more motivational phrases here
    ];
  
    const [selectedPhrase, setSelectedPhrase] = useState('');
  
    useEffect(() => {
      // Select a random phrase from the array
      const randomIndex = Math.floor(Math.random() * motivationalPhrases.length);
      setSelectedPhrase(motivationalPhrases[randomIndex]);
  
      // Simulate a delay before navigating to the main screen
      setTimeout(() => {
        navigation.navigate('Main');
      }, 2000); // Splash screen duration in milliseconds
    }, []);
  
    return (
      <View style={styles.container} testID="splash-screen">
        <Image source={logo} style={styles.logo} />
        <Text style={styles.motivationText}>{selectedPhrase}</Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#C7E4C7',
    },
    logo: {
      width: 240,
      height: 240,
      resizeMode: 'contain',
    },
    motivationText: {
      fontSize: 16,
      marginTop: 10,
      textAlign: 'center',
    },
  });
  
  export default SplashScreen;
  