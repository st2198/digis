import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Signup from '../src/app/signup/page';
import { act } from 'react-dom/test-utils';

describe('Signup', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('allows a new user to sign up', async () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(null);

    render(<Signup />);
    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });

    await act(async () => {
      fireEvent.click(screen.getByText(/Sign Up/));
    });

    expect(window.localStorage.setItem).toHaveBeenCalledWith('newuser', JSON.stringify({ username: 'newuser', password: 'password123' }));
  });

  it('shows an error message for an existing username', async () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify({ username: 'existingUser', password: 'password123' }));

    render(<Signup />);
    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'existingUser' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });

    await act(async () => {
      fireEvent.click(screen.getByText(/Sign Up/));
    });

    expect(screen.getByText(/Username already exists. Please choose a different username./)).toBeInTheDocument();
  });
});
