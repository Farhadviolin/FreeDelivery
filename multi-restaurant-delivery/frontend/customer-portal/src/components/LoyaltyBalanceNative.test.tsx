import { render, fireEvent } from '@testing-library/react-native';
import { LoyaltyBalanceNative } from './LoyaltyBalanceNative';

jest.mock('../hooks/useLoyalty', () => ({
  useLoyalty: (userId: string) => ({
    points: userId === 'error' ? undefined : 99,
    status: userId === 'error' ? 'error' : userId === 'loading' ? 'loading' : 'success',
    refresh: jest.fn(),
  }),
}));

describe('LoyaltyBalanceNative', () => {
  it('zeigt Loading-Status', () => {
    const { getByTestId } = render(<LoyaltyBalanceNative userId="loading" />);
    expect(getByTestId('ActivityIndicator')).toBeTruthy();
  });
  it('zeigt Fehler-Status', () => {
    const { getByText } = render(<LoyaltyBalanceNative userId="error" />);
    expect(getByText(/Fehler beim Laden/i)).toBeTruthy();
  });
  it('zeigt Punktestand', () => {
    const { getByText } = render(<LoyaltyBalanceNative userId="u2" />);
    expect(getByText(/99 P/i)).toBeTruthy();
  });
  it('kann refresh triggern', () => {
    const { getByText } = render(<LoyaltyBalanceNative userId="u2" />);
    fireEvent.press(getByText(/Aktualisieren/i));
    // Kein Fehler = Button vorhanden und klickbar
  });
});
