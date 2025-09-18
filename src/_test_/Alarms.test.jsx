import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Alarms from "../pages/control/Alarms";

test("renders alarms heading", () => {
  render(
    <MemoryRouter>
      <Alarms darkMode={false} />
    </MemoryRouter>
  );

  expect(screen.getByText(/Alarmas de Medicamentos/i)).toBeInTheDocument();
});
