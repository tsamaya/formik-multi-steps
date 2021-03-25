import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Formik - Multi Steps', () => {
  render(<App />);
  const textElement = screen.getByText(/Multi-Steps/i);
  expect(textElement).toBeInTheDocument();
});
