import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

LocaleConfig.locales['en'] = {
  formatAccessibilityLabel: "dddd d 'of' MMMM 'of' yyyy",
  monthNames: [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ],
  monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
  today: 'Today'
};
LocaleConfig.defaultLocale = 'en';

const CalendarScreen = ({ tasks }) => {
  const [taskDates, setTaskDates] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDateTasks, setSelectedDateTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    fetchTaskDates();
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchTaskDates = async () => {
    try {
      const tasksString = await AsyncStorage.getItem('tasks');

      if (tasksString) {
        const tasks = JSON.parse(tasksString);
        console.log('Fetched Tasks in line 42:', tasks);

        const taskDatesMap = {};

        tasks.forEach((task) => {
          const startDate = new Date(task.startDate);
          const formattedStartDate = formatDate(startDate);
          console.log(`Formatted Date for Task ${task.id}: ${formattedStartDate}`);

          if (taskDatesMap[formattedStartDate]) {
            taskDatesMap[formattedStartDate]++;
          } else {
            taskDatesMap[formattedStartDate] = 1;
          }
        });

        console.log('Fetched Tasks:', tasks);

        setTaskDates(taskDatesMap);
      }
    } catch (error) {
      console.error('Error fetching task dates:', error);
    }
  };

  const markedDates = Object.entries(taskDates).reduce((acc, [date, count]) => {
    acc[date] = {
      customStyles: {
        container: {
          backgroundColor: 'transparent', // Customize the background color as needed
        },
      },
      dots: Array(count)
        .fill(null)
        .map((_, index) => ({
          key: `${date}_${index}`, // Create a unique key
          color: 'red', // Customize dot color as needed
        })),
    };
    return acc;
  }, {});

  const onDayPress = async (day) => {
    const selectedDate = day.dateString;
    try {
      const tasksString = await AsyncStorage.getItem('tasks');
      if (tasksString) {
        const tasks = JSON.parse(tasksString);
        console.log('Fetched Tasks in onDayPress:', tasks);

        // Filter tasks based on the selected date
        const selectedDateTasks = tasks.filter(
          (task) => formatDate(new Date(task.startDate)) === selectedDate
        );
        console.log('Selected Date Tasks:', selectedDateTasks);

        setSelectedDateTasks(selectedDateTasks);
        setSelectedDate(selectedDate);
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error fetching tasks in onDayPress:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Calendar
        markingType="multi-dot"
        markedDates={markedDates}
        onDayPress={onDayPress}
        style={{ backgroundColor: '#fff' }}
        theme={{
          calendarBackground: '#fff',
          todayTextColor: 'white',
          todayBackgroundColor: 'pink',
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View>
            {/* <Text style={styles.modalTitle}>Tasks for {selectedDate}</Text> */}
          </View>
          <FlatList
            data={selectedDateTasks}
            keyExtractor={(task) => task.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Icon name="thumbtack" size={23} color="#00A36C" style={styles.thumbtackIcon} />
                <Text style={styles.modelText}>{item.title}</Text>
              </View>
            )} 
          />
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Text>Close</Text>
            <Icon name="times" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C7E4C7',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#C7E4C7',
    top: 100,
    height: '88%',

  },
  closeButton: {
    borderRadius: 8,
    bottom: 130,
    padding: 2,
    alignItems: 'center',
  },
  modelText: {
    fontSize: 16,
    padding: 2,
    backgroundColor: '#C7E4C7',

  },
  itemContainer: {
    borderBottomWidth: 1,
    borderColor: '#D1D1D1',
    paddingVertical: 8,
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbtackIcon: {
    width: 24,
    height: 24,
    marginRight:0,
    marginLeft: 10,
  },
});

export default CalendarScreen;
