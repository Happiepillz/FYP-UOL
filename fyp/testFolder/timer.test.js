import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Timer from '../components/timer';

test('renders the Timer component', () => {
  const { getByTestId } = render(<Timer />);
  
  // Check if the timer text is present
  const timerText = getByTestId('timer-text');
  expect(timerText).toBeTruthy();

  // Check if the play button is present
  const playButton = getByTestId('play-button');
  expect(playButton).toBeTruthy();

  // Check if the reset button is present
  const resetButton = getByTestId('reset-button');
  expect(resetButton).toBeTruthy();
});

test('clicking the Reset button should reset the timer', async () => {
  const { getByTestId } = render(<Timer />);
  const playButton = getByTestId('play-button');
  const resetButton = getByTestId('reset-button');

  // Click the Play button
  fireEvent.press(playButton);

  // Wait for 1 second (simulating a timer tick)
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Click the Reset button
  fireEvent.press(resetButton);

  // Check if the timer text has reset to the initial value
  const timerText = getByTestId('timer-text');
  const initialTime = timerText.props.children;

  expect(initialTime).toEqual('25:00');
});
