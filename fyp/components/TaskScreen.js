import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Task from './task';
// This screen is where a To do list will be implemented
const TaskScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Task navigation={navigation} route={route} ></Task>
    {/* <CompletedTask completedTasks={completedTasks} /> */}
    {/* Add your profile content here */}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
  //   alignItems: 'center',
    flex: 1,
    backgroundColor:"#C7E4C7",

   },
});

export default TaskScreen;
