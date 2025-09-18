import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';

test('renders Login heading', () => {
  render(
    <MemoryRouter>
      <Login darkMode={false} />
    </MemoryRouter>
  );

  expect(screen.getByText(/Iniciar Sesión/i)).toBeInTheDocument();
});
