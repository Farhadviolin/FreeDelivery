import { render, screen } from '@testing-library/react';
import DriverDashboard from '../pages/driver-dashboard';

test('zeigt Fahrer-Dashboard mit Links', () => {
  render(<DriverDashboard />);
  expect(screen.getByText('Fahrer-Dashboard')).toBeInTheDocument();
  expect(screen.getByText('Aufträge')).toBeInTheDocument();
  expect(screen.getByText('Analytics')).toBeInTheDocument();
  expect(screen.getByText('Profil')).toBeInTheDocument();
  expect(screen.getByText('Einstellungen')).toBeInTheDocument();
});
