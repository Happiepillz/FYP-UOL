import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Vibration } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Timer = () => {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      Vibration.vibrate([500, 500, 500, 500, 500]); // Vibrate for 3 times with 500ms duration each time
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(25 * 60);
  };

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Icon name='stopwatch' size={33} color="#617861"/>
      <Text style={styles.timerText} testID='timer-text'>{formatTime(seconds)}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={toggleTimer}
          disabled={seconds === 0}
          testID={isActive ? 'pause-button' : 'play-button'}
        >
          <Icon name={isActive ? 'pause' : 'play'} size={25} color="#516451" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={resetTimer}
          disabled={!isActive && seconds === 25 * 60}
          testID='reset-button'
        >
          <Icon name="stop" size={25} color="#516451" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 48,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    color:'#00A36C',
  },
});

export default Timer;
