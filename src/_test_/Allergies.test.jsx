import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Allergies from '../pages/control/Allergies';

test('renders Allergies heading', () => {
  render(
    <MemoryRouter>
      <Allergies darkMode={false} />
    </MemoryRouter>
  );

  // Buscamos el heading (ejemplo: h4) con el texto "Alergias"
  expect(
    screen.getByRole('heading', { name: /Alergias/i })
  ).toBeInTheDocument();
});
