import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, SafeAreaView } from 'react-native';

const DateTime = ({ selectedDate, setSelectedDate }) => {
  const [show, setShow] = useState(true); // Set show to true initially

  const onChange = (event, date) => {
    setShow(false); // Automatically hide the picker after selection
    setSelectedDate(date); // Update selectedDate in the parent component
  };

  useEffect(() => {
    if (show) {
      onChange(null, selectedDate); // Show date picker immediately
    }
  }, []);

  return (
    <View>
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate}
          mode="date" // Set mode to Date
          is24Hour={true}
          display="default"
          onChange={onChange}
          minimumDate={new Date()} // Set maximumDate to the current date
        />
    </View>
  );
};

export default DateTime;
