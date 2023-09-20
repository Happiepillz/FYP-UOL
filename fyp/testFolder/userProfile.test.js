import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import UserProfile from '../components/userProfile';

test('renders the UserProfile component', () => {
  const { getByText, getByTestId } = render(<UserProfile />);

  // Check if user data is displayed
  const nameText = getByText('Name');
  const nicknameText = getByText('Nickname');
  const dobText = getByText('Date of Birth');
  const emailText = getByText('Email');

  expect(nameText).toBeTruthy();
  expect(nicknameText).toBeTruthy();
  expect(dobText).toBeTruthy();
  expect(emailText).toBeTruthy();

  // Check if the "Edit" button is initially displayed
  const editButton = getByText('Edit');
  expect(editButton).toBeTruthy();

  // Click the "Edit" button
  fireEvent.press(editButton);

  // Check if the "Save" button is displayed after clicking "Edit"
  const saveButton = getByText('Save');
  expect(saveButton).toBeTruthy();

  // Check if input fields are displayed after clicking "Edit"
  const nameInput = getByTestId('name-input');
  const nicknameInput = getByTestId('nickname-input');
  const dobInput = getByTestId('dob-input');
  const emailInput = getByTestId('email-input');

  expect(nameInput).toBeTruthy();
  expect(nicknameInput).toBeTruthy();
  expect(dobInput).toBeTruthy();
  expect(emailInput).toBeTruthy();
});
