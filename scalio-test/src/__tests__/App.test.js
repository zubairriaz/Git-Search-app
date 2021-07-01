import React from 'react';

import { render, screen } from '@testing-library/react';

import App from '../App';



test('Check If It has Submit Button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Submit/i);
  expect(linkElement).toBeInTheDocument();
});

test('Check If It has input Element', () => {
  render(<App />);
  const input = screen.queryByPlaceholderText(/Enter Login Text/i);
  expect(input).toBeInTheDocument();
});


