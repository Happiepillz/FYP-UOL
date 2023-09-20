import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CompletedTaskScreen = ({ route }) => {
  const { completedTasks } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completed Tasks</Text>
      {completedTasks && completedTasks.length > 0 ? (
        <FlatList
          data={completedTasks}
          renderItem={({ item }) => (
            <View style={styles.completedTaskContainer}>
              <Icon name="check-circle" size={23} color="#00A36C" />
              <Text style={styles.completedTaskTitle}>  {item.title}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.emptyText}>No completed tasks available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C7E4C7',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  completedTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#D1D1D1',
    paddingVertical: 10,
  },
  completedTaskTitle: {
    fontSize: 16,
    color: 'black', // Customize the text color
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#666',
  },
});

export default CompletedTaskScreen;
