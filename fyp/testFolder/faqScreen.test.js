import React from 'react';
import { render } from '@testing-library/react-native';

import FAQScreen from '../components/faqScreen';

// Mock data for testing
const faqData = [
  { id: 1, qns: 'Question 1', ans: 'Answer 1' },
  { id: 2, qns: 'Question 2', ans: 'Answer 2' },
];

// Mock the data source 
jest.mock('../assets/faq.json', () => faqData);

test('renders the FAQScreen component', () => {
  const { getByText } = render(<FAQScreen />);

  // Check if the questions and answers are rendered
  const question1 = getByText('Question 1');
  const answer1 = getByText('Answer 1');
  const question2 = getByText('Question 2');
  const answer2 = getByText('Answer 2');

  expect(question1).toBeTruthy();
  expect(answer1).toBeTruthy();
  expect(question2).toBeTruthy();
  expect(answer2).toBeTruthy();
});

test('renders individual FAQ items correctly', () => {
  const { getByText } = render(<FAQScreen />);

  // Check if each FAQ item is rendered correctly
  const question1 = getByText('Question 1');
  const answer1 = getByText('Answer 1');
  expect(question1).toBeTruthy();
  expect(answer1).toBeTruthy();

  const question2 = getByText('Question 2');
  const answer2 = getByText('Answer 2');
  expect(question2).toBeTruthy();
  expect(answer2).toBeTruthy();
});
