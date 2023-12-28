import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Login from '../src/app/login/page'

describe('Login', () => {
  it('Check for welcome message', () => {
    render(<Login />);

    expect(screen.getByText(/Welcome/)).toBeInTheDocument()
  });

  it('Check for error message', async () => {
    render(<Login />);

    // Fill out the form fields
    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });

    // Click the submit button
    fireEvent.click(screen.getAllByText(/Login/)[1]);

    expect(screen.getByText(/User not found. Please sign up./)).toBeInTheDocument();
  });
})
