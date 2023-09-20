import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet } from 'react-native';

// screen components
import SplashScreen from './SplashScreen.js';
import HomeScreen from './HomeScreen.js';
import ProfileScreen from './ProfileScreen.js';
import TaskScreen from './TaskScreen.js';
import CalendarScreen from './calendarScreen.js';
import FAQScreen from './faqScreen.js';
import CompletedTaskScreen from './completedTaskScreen.js';
import RedeemRewardScreen from './rewardScreen.js';
import AboutUsScreen from './aboutUsScreen.js';
import UserProfile from './userProfile.js';
import NoteTaking from './NoteTaking.js';
import NoteListScreen from './NoteList.js';


const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();
const HomeStacks = createStackNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <HomeStacks.Navigator>
      <HomeStacks.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStacks.Screen name="NoteTaking" component={NoteTaking} options={{ headerTitle: '', headerTitleStyle: { fontSize: 36 }, headerStyle: { backgroundColor: '#C7E4C7' } }} />
    </HomeStacks.Navigator>
  );
};
const ProfileStacks = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <ProfileStack.Screen name="FAQScreen" component={FAQScreen} options={{ headerTitle: 'FAQ', headerTitleStyle: { fontSize: 36 }, headerStyle: { backgroundColor: '#C7E4C7' } }} />
      <ProfileStack.Screen name="CompletedTask" component={CompletedTaskScreen} options={{ headerTitle: '', headerStyle: { backgroundColor: '#C7E4C7' } }} />
      <ProfileStack.Screen name="RedeemReward" component={RedeemRewardScreen} options={{ headerTitle: '', headerStyle: { backgroundColor: '#C7E4C7' } }} />
      <ProfileStack.Screen name="AboutUs" component={AboutUsScreen} options={{ headerTitle: '', headerTitleStyle: { fontSize: 36 }, headerStyle: { backgroundColor: '#C7E4C7' } }} />
      <ProfileStack.Screen name="UserProfile" component={UserProfile} options={{ headerTitle: '', headerTitleStyle: { fontSize: 36 }, headerStyle: { backgroundColor: '#C7E4C7' } }} />
      <ProfileStack.Screen name="NoteListScreen" component={NoteListScreen} options={{ headerTitle: '', headerTitleStyle: { fontSize: 36 }, headerStyle: { backgroundColor: '#C7E4C7' } }} />
    </ProfileStack.Navigator>
  );
};


const NavigationBar = ({ tasks }) => {
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({

          tabBarStyle: { backgroundColor: '#c7e4c7' },
          tabBarIcon: ({ color }) => {
            let iconName;
            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Profile':
                iconName = 'user-circle';
                break;
              case 'Task':
                iconName = 'tasks';
                break;
              case 'Calendar':
                iconName = 'calendar-alt';
              default:
                break;

            }

            return <Icon name={iconName} color={color} size={24} />;
          },
          tabBarInactiveTintColor: '#7dab78',
          tabBarActiveTintColor: '#355133',
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
        <Tab.Screen name="Task" component={TaskScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Calendar" component={() => <CalendarScreen tasks={tasks} />} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={ProfileStacks} options={{ headerShown: false }} />

      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c7e4c7',
  }
});

export default NavigationBar;
