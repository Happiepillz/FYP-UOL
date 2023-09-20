// import React in our code
import React, {useState, useEffect} from 'react';

// import all the components we are going to use
import {StyleSheet, View, Text} from 'react-native';
import MusicPlayer from './musicPlayer';
import Weather from './weather';
import Timer from './timer';
import Icon from 'react-native-vector-icons/FontAwesome5';


const Widget = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
      const time = `${now.getHours()}:${now.getMinutes()}`;
      setCurrentDate(date);
      setCurrentTime(time);
    };
  // Update the clock every second (1000 milliseconds)
  const intervalId = setInterval(updateClock, 1000);

  // Initial update
  updateClock();

  // Clean up the interval when the component unmounts
  return () => clearInterval(intervalId);
}, 
[]);

  return (
    <View>
      <View style={styles.topContainer}>
        <View style={styles.smallWidget}>
          <View style={styles.datetimeContainer}>
          <Icon name='clock' size={33} color="#617861"/>
          <Text style={styles.textStyle}>
            {currentDate}
          </Text>
          <Text style={styles.textStyle}>
            {currentTime}
          </Text>
          </View>
        </View>
        <View style={styles.space}></View>
        <View style={styles.smallWidget}>
          {/*  This is where the music player widget will be implemented */}
          <Weather></Weather>
        </View>
        
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.BigWidget}>
          <MusicPlayer></MusicPlayer>
        </View>
        <View style={styles.space}></View>
        <View style={styles.BigWidget}>
          <Timer></Timer>
        </View> 
      </View>
      
      {/*  */}
        
    </View>


  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row', // Arrange items horizontally
    top: 40,
  },
  bottomContainer: {
    flexDirection: 'column', // Arrange items horizontally
    top: 60,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 26,
    color: 'black',
  },
  smallWidget: {
    backgroundColor: '#C7E4C7', // Background color
    borderWidth: 1, // Border width
    borderColor: '#000', // Border color
    borderRadius: 8, // Border radius
    padding: 10, // Padding inside the widget
    marginBottom: 10, // Margin bottom for spacing
    width:150,
    height:150,

  },
  space: {
    width: 10,
    height: 10,
  },
  datetimeContainer:{
    flex:1,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
  BigWidget: {
    width: 310,
    height: 150,
    backgroundColor: '#C7E4C7',
    borderRadius: 8,
    borderWidth: 1,
    // borderColor: '#000',
  },

});

export default Widget;