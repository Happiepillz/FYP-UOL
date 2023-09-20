import react from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, StatusBar, Alert} from 'react-native';

const AboutUsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>About Us</Text>
            <Text style={styles.bodyText}>Hello! I am a dedicated student on a mission to help you conquer time management challenges with my Star Stud application. As a student myself, I understand the demands of juggling assignments, exams, and daily life. That's why I've designed Star Stud with the powerful Pomodoro technique at its core. But I didn't stop there – I've gone the extra mile. In addition to enhancing your productivity, my app offers you a glimpse into the day with weather forecasts and provides a harmonious backdrop for your work with a built-in music player. I believe in striking the perfect balance between work and leisure, and Star Stud is my way of helping you do just that.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C7E4C7',
        paddingTop: StatusBar.currentHeight,
    },
    titleText: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
    },
    bodyText: {
        fontSize: 16,
        padding: 10,
    }
});

export default AboutUsScreen;
