import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DateTime from './datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Task = () => {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [selectedStartDate, setSelectedStartDate] = useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    const navigation = useNavigation();

  const handleAddTask = async () => {
    if (task.trim() !== '') {
      const newTask = {
        id: Date.now().toString(),
        title: task,
        completed: false,
        startDate: formatDate(selectedStartDate),
        endDate: formatDate(selectedEndDate),
      };

      try {
        const updatedTasks = [...tasks, newTask];
        await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
        setTask('');
      } catch (error) {
        console.error('Error saving task:', error);
      }
    }
  };

const handleToggleComplete = async (taskId) => {
    const updatedTasks = tasks.map((item) =>
      item.id === taskId ? { ...item, completed: !item.completed } : item
    );
  
    const pointsToAdd = updatedTasks.filter((item) => item.id === taskId && item.completed).length * 15;

    let updatedPoints; // Declare updatedPoints outside the try block

    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
     
      // Update points in AsyncStorage
      const pointsString = await AsyncStorage.getItem('points');
      const currentPoints = pointsString ? parseInt(pointsString) : 0;
      const updatedPoints = currentPoints + pointsToAdd;
      await AsyncStorage.setItem('points', updatedPoints.toString());

      const updatedCompletedTasks = updatedTasks.filter((item) => item.completed);

      // Pass the completed tasks directly to the Profile screen

      console.log('updatedPoints', updatedPoints);
    } catch (error) {
      console.error('Error saving updated tasks:', error);
    }

    
  };
  
  const handleDeleteTask = async (taskId) => {
    const updatedTasks = tasks.filter((item) => item.id !== taskId);

    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error saving updated tasks:', error);
    }
  };

  const handleViewStoredTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks !== null) {
        const storedTasks = JSON.parse(savedTasks);
        console.log('Stored Tasks:', storedTasks);
      } else {
        console.log('No tasks stored.');
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('tasks');
        if (savedTasks !== null) {
          setTasks(JSON.parse(savedTasks));
        }
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };

    loadTasks();
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>To-Do List</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a task..."
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <View style={styles.dateContainer}>
      <Text style={styles.dateText}>Start Date</Text>
      <DateTime
        selectedDate={selectedStartDate}
        setSelectedDate={setSelectedStartDate}
      />
      </View>
        <View style={styles.dateContainer}>
        <Text style={styles.dateText}>End Date</Text>
        <DateTime
            selectedDate={selectedEndDate}
            setSelectedDate={setSelectedEndDate}
        />
        </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.listView}
        data={tasks.filter((item) => !item.completed)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <TouchableOpacity
              onPress={() => handleToggleComplete(item.id)}
              style={[
                styles.taskItem,
                { textDecorationLine: item.completed ? 'line-through' : 'none' },
              ]}
            >
              <View style={styles.pencilTextView}>
              <Icon name="pencil-alt" size={20}  />
              <Text style={styles.itemTitle}>{item.title}</Text>
              </View>
              <View style={styles.itemDate}> 
              <Text>Start Date: {item.startDate}</Text>
              <Text>End Date: {item.endDate}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteTask(item.id)}
            >
              <Icon name="trash" size={20} style={styles.deleteIcon} />
            </TouchableOpacity>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C7E4C7',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '80%',
    padding: 10,
  },
  addButton: {
    backgroundColor: '#00A36C',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: '#C7E4C7',
    borderWidth: 1,
    borderRadius: 8,
  },
  taskItem: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#C7E4C7',
    padding: 5,
    borderRadius: 5,
  },
  deleteIcon: {
    //backgroundColor: '#000',
    color: '#00A36C',
  },
  listView: {
    width: '100%',
    backgroundColor: '#C7E4C7',
  },
  viewTasksButton: {
    backgroundColor: '#00A36C',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  dateContainer:{
    flexDirection: 'row',
  }, 
  dateText:{
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  pencilTextView:{
    flexDirection: 'row',

  },
  itemTitle:{
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
  itemDate:{
    flexDirection: 'row',
  },
});

export default Task;
