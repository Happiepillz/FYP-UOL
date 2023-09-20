import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import AboutUsScreen from '../components/aboutUsScreen.js';

test('renders the AboutUsScreen component', async () => {
  const { getByText } = render(<AboutUsScreen />);

  // Wait for the component to render
  await waitFor(() => {
    // Check if the title text is present
    const titleText = getByText('About Us');
    expect(titleText).toBeTruthy();

    // Check if the body text is present
    const bodyText = getByText(
      "Hello! I am a dedicated student on a mission to help you conquer time management challenges with my Star Stud application. As a student myself, I understand the demands of juggling assignments, exams, and daily life. That's why I've designed Star Stud with the powerful Pomodoro technique at its core. But I didn't stop there – I've gone the extra mile. In addition to enhancing your productivity, my app offers you a glimpse into the day with weather forecasts and provides a harmonious backdrop for your work with a built-in music player. I believe in striking the perfect balance between work and leisure, and Star Stud is my way of helping you do just that."
    );
    expect(bodyText).toBeTruthy();
  });
});
