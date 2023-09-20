import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, TextInput } from 'react-native';
import FA5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const NoteListScreen = () => {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDetails, setEditDetails] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const navigation = useNavigation();

  // Fetch notes from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const savedNotes = await AsyncStorage.getItem('notes');
        if (savedNotes) {
          setNotes(JSON.parse(savedNotes));
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const handleSubmitEdit = async () => {
  const updatedNotes = notes.map((note) =>
    note.id === selectedNote.id
      ? { ...note, title: editTitle, details: editDetails }
      : note
  );

  try {
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
    setShowModal(false);
    setSelectedNote(null);
  } catch (error) {
    console.error('Error saving updated notes:', error);
  }
};


  const handleDeleteNote = async (noteId) => {
    const updatedNotes = notes.filter((item) => item.id !== noteId);

    try {
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      setNotes( );
    } catch (error) {
      console.error('Error saving updated books:', error);
    }
  };

  const handleEditandShowModal = (noteId) => {
  const selectedNote = notes.find((note) => note.id === noteId);
  setSelectedNote(selectedNote);
  setEditTitle(selectedNote.title);
  setEditDetails(selectedNote.details);
  setIsEditing(false); // Start in view mode
  setShowModal(true);
};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notes</Text>

      <FlatList
        style={styles.listView}
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <TouchableOpacity onPress={() => handleEditandShowModal(item.id)}>
              <View style={styles.pencilTextView}>
                <FA5 name="pencil-alt" size={20} />
                <Text style={styles.itemTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteNote(item.id)}
            >
              <FA5 name="trash" size={20} style={styles.deleteIcon} />
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal
  visible={showModal}
  animationType="slide"
  transparent={true}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Edit Note</Text>
      <TextInput
        style={styles.editInput}
        placeholder="Note Title"
        value={editTitle}
        onChangeText={(text) => setEditTitle(text)}
        editable={isEditing} // Allow editing when isEditing is true
      />
      <TextInput
        style={[styles.editInput, { height: 150 }]}
        placeholder="Note Details"
        multiline
        value={editDetails}
        onChangeText={(text) => setEditDetails(text)}
        editable={isEditing} // Allow editing when isEditing is true
      />
      <View style={styles.editButtons}>
        {!isEditing ? (
          <TouchableOpacity
            style={[styles.editButton, styles.selectededit]}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.submitButtonText}>Edit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.editButton, styles.selectededit]}
            onPress={handleSubmitEdit}
          >
            <Text style={styles.submitButtonText}>Save</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.editButton, styles.selectededit]}
          onPress={() => setShowModal(false)}
        >
          <Text style={styles.submitButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#C7E4C7',
    flex:1,
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
    color:'black',
  },
  addButton: {
    backgroundColor: '#d5716e',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: 250,
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
    color: '#00A36C',
  },
  listView: {
    width: '100%',
    backgroundColor: '#C7E4C7',

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
  inputDetails:{
    height: 100,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '80%',
    padding: 10,
    color:'black',
    textAlign:'left',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  editInput: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  editButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginRight: 5,
  },
  selectededit: {
    backgroundColor: '#d5716e',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NoteListScreen;
