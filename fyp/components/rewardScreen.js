import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import rewardsList from '../assets/rewards.json';


const RedeemRewardsScreen = ({ route}) => {
  const { points } = route.params;
  console.log(points)

  const handleRedeemReward = async (reward) => {
    if (reward.points <= points) {
      // Deduct points and update AsyncStorage
      const updatedPoints = points - reward.points;
      await AsyncStorage.setItem('points', updatedPoints.toString());

      // Handle the reward redemption logic
      Alert.alert('Success', 'Reward redeemed successfully');
      console.log('Reward redeemed successfully');
      // Refresh the points after redemption
      setPoints(updatedPoints);
    } else {
      // Handle the case when the user doesn't have enough points
      Alert.alert('Error', 'Not enough points to redeem this reward');
    }
  };



  return (
    <View style={styles.container}>
      <Text style={styles.header}>Redeem Rewards</Text>
      <FlatList
        data={rewardsList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.rewardItem}
            onPress={() => handleRedeemReward(item)} // Pass the reward item to the handler
            disabled={item.points > points} // Disable the button if not enough points
          >
            <Text>{item.name}</Text>
            <Text>{item.points} points</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C7E4C7",
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  rewardItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    width: '100%',
  },
});

export default RedeemRewardsScreen;


