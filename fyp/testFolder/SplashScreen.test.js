import React from 'react';
import { render } from '@testing-library/react-native';
import SplashScreen from '../components/SplashScreen';

test('renders the SplashScreen component', () => {
    const { getByTestId } = render(<SplashScreen />);
    const splashScreen = getByTestId('splash-screen');
  
    expect(splashScreen).toBeTruthy();
  });
