import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Signup from '../src/pages/signup';

describe('Signup', () => {
    beforeAll(() => {
        const mockLocalStorage = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn(),
        };
    
        Object.defineProperty(window, 'localStorage', {
            value: mockLocalStorage,
            writable: true,
        });
    
        (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
    });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('allows a new user to sign up', () => {
    render(<Signup />);
    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getAllByText(/Sign Up/)[1]);

    expect(window.localStorage.setItem).toHaveBeenCalledWith('newuser', JSON.stringify({ username: 'newuser', password: 'password123' }));
  });

  it('shows an error message for an existing username', () => {
    (window.localStorage.getItem as jest.Mock).mockImplementation((key) =>
        key === 'existingUser' ? JSON.stringify({ username: 'existingUser', password: 'password123' }) : null
    );

    render(<Signup />);

    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'existingUser' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getAllByText(/Sign Up/)[1]);

    expect(screen.getByText(/Username already exists. Please choose a different username./)).toBeInTheDocument();
});
});
