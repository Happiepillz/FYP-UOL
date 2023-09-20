import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';


const UserProfile = () => {
  const profilePicture = require('../assets/pp.jpg');

  const [userData, setUserData] = useState({
    name: 'Vivian',
    nickname: 'Vivi',
    dob: '01/01/1990',
    email: 'vivian@example.com',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEditPress = () => {
    setIsEditing(!isEditing);
  };

  const handleSavePress = () => {
    // Save the edited data to AsyncStorage
    setIsEditing(false);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.label}>{item.label}</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={userData[item.key]}
            onChangeText={(text) => setUserData({ ...userData, [item.key]: text })}
          />
        ) : (
          <Text style={styles.value}>{userData[item.key]}</Text>
        )}
      </View>
    );
  };

  const data = [
    { label: 'Name', key: 'name' },
    { label: 'Nickname', key: 'nickname' },
    { label: 'Date of Birth', key: 'dob' },
    { label: 'Email', key: 'email' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={profilePicture} style={styles.profileImage} />
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
      {isEditing ? (
        <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'#C7E4C7'
  },
  itemContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    marginBottom: 4,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120, // Adjust the width and height as needed
    height: 120,
    borderRadius: 60, // To make it a circular image
  },
  editButton: {
    backgroundColor: '#00A36C',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#00A36C',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserProfile;
