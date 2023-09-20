import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Touchable, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

// import statement from the file where the playlist is stored in assets folder
import Playlist from '../assets/playlist.json';

// for icons
import Icon from 'react-native-vector-icons/FontAwesome5';

const MusicPlayer = () => {
  const [sound, setSound] = useState();
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  

  const loadSound = async (url) => {
    const { sound } = await Audio.Sound.createAsync({ uri: url });
    setSound(sound);
  };

  useEffect(() => {
    if (Playlist[currentTrackIndex] && Playlist[currentTrackIndex].url) {
      loadSound(Playlist[currentTrackIndex].url);
    }
  

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [currentTrackIndex]);

  const playSound = async () => {
    if (sound) {
      await sound.playAsync();
    }
  };

  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync();
    }
  };

  const handleNextTrack = () => {
    if (currentTrackIndex < Playlist.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  };

  const handlePrevTrack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  };


  return (
    <View>
      <View style={styles.iconView}>
      <Icon name="music" size={33} color="#617861"></Icon>
      </View>
      <View style={styles.titleView}>
      <Text style={styles.nowPlaying}>Now playing</Text>
        <Text style={styles.title}>
          {Playlist[currentTrackIndex].title}
        </Text>
      </View>
      <View style={styles.control}>
      <TouchableOpacity onPress={handlePrevTrack}style={styles.controlButtons}>
        <Icon name="backward" size={25} color="#516451"/>
      </TouchableOpacity>
      <TouchableOpacity onPress={playSound} style={styles.controlButtons}>
        <Icon name="play" size={25} color="#516451"/>
      </TouchableOpacity>
      <TouchableOpacity onPress={pauseSound} style={styles.controlButtons}>
        <Icon name="pause" size={25} color="#516451"/>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNextTrack}style={styles.controlButtons}>
        <Icon name="forward" size={25} color="#516451"/>
      </TouchableOpacity>
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  control: {
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 10,
  },
  controlButtons:{
    padding: 10,
  },
  titleView:{
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    top: 10,
    
  },
  title:{
    paddingBottom:20,
    
  },
  iconView:{
    top:5,
    alignItems: 'center',
  },
  nowPlaying:{
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 5,
  }

});

export default MusicPlayer;
