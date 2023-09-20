import React from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar } from 'react-native';
import faq from '../assets/faq.json';

const FAQScreen = () => {
  const renderFAQItem = ({ item }) => (
    <View style={styles.faqItem}>
      <Text style={styles.qns}>{item.qns}</Text>
      <Text style={styles.ans}>{item.ans}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={faq}
        renderItem={renderFAQItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C7E4C7',
    paddingTop: StatusBar.currentHeight,
  },
  faqItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  qns: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ans: {
    fontSize: 14,
  },
});

export default FAQScreen;
