import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ProfileScreen = () => {
  const route = useRoute();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [completedTasks, setCompletedTasks] = useState([]);
  const [points, setPoints] = useState(0);

  const goToFAQ = () => {
    navigation.navigate('FAQScreen');
  };

  const goToRewards = () => {
    navigation.navigate('RedeemReward', { points });
  };

  const goToAboutUs = () => {
    navigation.navigate('AboutUs');
  };

  const goToProfile = () => {
    navigation.navigate('UserProfile');
  };
   
  const goToNoteList = () => {
    navigation.navigate('NoteListScreen');
  };

  const fetchCompletedTasksAndPoints = async () => {
    try {
      const tasksString = await AsyncStorage.getItem('tasks');
      if (tasksString) {
        const tasks = JSON.parse(tasksString);
        const completed = tasks.filter((task) => task.completed);
        setCompletedTasks(completed);

        const pointsString = await AsyncStorage.getItem('points');
        const currentPoints = pointsString ? parseInt(pointsString) : 0;
        setPoints(currentPoints);
      }
    } catch (error) {
      console.error('Error fetching completed tasks and points:', error);
    }
    console.log(points)
  };

  useEffect(() => {
    fetchCompletedTasksAndPoints();
  }, [isFocused]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Icon name="user-circle" size={80} color="#d5716e" style={styles.profileIcon} />
        <Text style={styles.profileText}>Welcome</Text>
        <Text style={styles.pointsText}>Available Points: {points} pts</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity onPress={goToProfile} style={styles.sectionButton}>
          <Icon name="user" size={25} color="#d5716e" />
          <Text style={styles.sectionButtonText}>User Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity onPress={() => navigation.navigate('CompletedTask', { completedTasks })} style={styles.sectionButton}>
          <Icon name="history" size={25} color="#d5716e" />
          <Text style={styles.sectionButtonText}>View Completed</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity onPress={goToRewards} style={styles.sectionButton}>
          <Icon name="gift" size={25} color="#d5716e" />
          <Text style={styles.sectionButtonText}>View Rewards</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity onPress={goToNoteList} style={styles.sectionButton}>
          <Icon name="sticky-note" size={25} color="#d5716e" />
          <Text style={styles.sectionButtonText}>All Notes</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.section}>
        <TouchableOpacity onPress={goToFAQ} style={styles.sectionButton}>
          <Icon name="question-circle" size={25} color="#d5716e" />
          <Text style={styles.sectionButtonText}>Frequently Asked Questions</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity onPress={goToAboutUs} style={styles.sectionButton}>
          <Icon name="info-circle" size={25} color="#d5716e" />
          <Text style={styles.sectionButtonText}>About Us</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C7E4C7',
    paddingTop: StatusBar.currentHeight,
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  profileIcon: {
    marginBottom: 10,
  },
  profileText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d5716e',
  },
  pointsText: {
    fontSize: 18,
    color: '#555',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 15,
  },
  sectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  sectionButtonText: {
    fontSize: 18,
    marginLeft: 15,
    color: '#555',
  },
});

export default ProfileScreen;
