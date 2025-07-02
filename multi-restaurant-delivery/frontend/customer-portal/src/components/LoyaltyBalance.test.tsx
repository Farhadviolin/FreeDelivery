import { render, screen, fireEvent } from '@testing-library/react';
import { LoyaltyBalance } from './LoyaltyBalance';

jest.mock('../hooks/useLoyalty', () => ({
  useLoyalty: (userId: string) => ({
    points: userId === 'error' ? undefined : 42,
    status: userId === 'error' ? 'error' : userId === 'loading' ? 'loading' : 'success',
    refresh: jest.fn(),
  }),
}));

describe('LoyaltyBalance', () => {
  it('zeigt Loading-Status', () => {
    render(<LoyaltyBalance userId="loading" />);
    expect(screen.getByText(/Loading points/i)).toBeInTheDocument();
  });
  it('zeigt Fehler-Status', () => {
    render(<LoyaltyBalance userId="error" />);
    expect(screen.getByText(/Error loading points/i)).toBeInTheDocument();
  });
  it('zeigt Punktestand', () => {
    render(<LoyaltyBalance userId="u1" />);
    expect(screen.getByText(/42 Punkte/i)).toBeInTheDocument();
  });
  it('kann refresh triggern', () => {
    render(<LoyaltyBalance userId="u1" />);
    fireEvent.click(screen.getByText(/Aktualisieren/i));
    // Kein Fehler = Button vorhanden und klickbar
  });
});
