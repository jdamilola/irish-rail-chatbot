import ChatBot from './ChatBot';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import React from 'react';

describe('ChatBot', () => {
  test('ChatBot header has correct title', () => {
    render(<ChatBot />);
    expect(screen.getByRole('heading', { name: /irish train chatbot/i })).toBeInTheDocument();
  });
  
  test('ChatBot displays messages', () => {
    render(<ChatBot />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Howth' } });
    fireEvent.keyPress(screen.getByRole('textbox'), { key: 'Enter', code: 13, charCode: 13 });
    waitFor(() => expect(screen.getByText(/Below are the next DART train times available at Howth./i)).toBeInTheDocument());
  });
  
  test('ChatBot submits messages', () => {
    render(<ChatBot />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Hello' } });
    fireEvent.keyPress(screen.getByRole('textbox'), { key: 'Enter', code: 13, charCode: 13 });
    waitFor(() => expect(screen.getByText('Hello')).toBeInTheDocument());
  });
});

