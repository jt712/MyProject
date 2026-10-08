import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './components/login';
import Home from './pages/Home';

jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({ children }) => <>{children}</>,
}));

describe('Login', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('shows the backend error when login response is plain text or non-JSON', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 401,
      text: jest.fn().mockResolvedValue('Unauthorized'),
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter Email \/ Username/i), {
      target: { value: 'student@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter Password/i), {
      target: { value: 'wrongpass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/unauthorized/i)).toBeInTheDocument();
    });
  });
});

describe('Home', () => {
  test('opens Career Counselling from the navbar', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /talk to us/i }));

    expect(screen.getByRole('heading', { name: /career counseling/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /ask a question/i })).toBeInTheDocument();
  });

  test('opens Career Counselling from the Engage section', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /talk with us/i }));

    expect(screen.getByRole('heading', { name: /career counseling/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /ask a question/i })).toBeInTheDocument();
  });
});
