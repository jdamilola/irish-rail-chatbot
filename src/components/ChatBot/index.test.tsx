import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ChatBot } from './index';

function renderChatBot() {
  return render(<ChatBot />); 
}

test('should display message and station list when user submits input', () => {
  const { getByPlaceholderText, getByText } = renderChatBot();
  const input = getByPlaceholderText('Enter a message...');
  fireEvent.change(input, { target: { value: 'Howth' } });
  fireEvent.click(getByText('Submit'));
  expect(getByText('Below is the next DART train time available at Howth.')).toBeInTheDocument();
  
  const stationLink = getByText('Howth');
  fireEvent.click(stationLink);
  expect(getByText('Below is the list of possible DART stations:')).toBeInTheDocument();
});

