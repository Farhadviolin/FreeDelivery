import { render, screen } from '@testing-library/react';
import PriceDisplay from './PriceDisplay';

describe('PriceDisplay', () => {
  it('renders formatted price for EUR', () => {
    render(<PriceDisplay amount={1234.5} currency="EUR" locale="de-DE" />);
    expect(screen.getByText('1.234,50 €')).toBeInTheDocument();
  });
  it('renders formatted price for USD', () => {
    render(<PriceDisplay amount={1234.5} currency="USD" locale="en-US" />);
    expect(screen.getByText('$1,234.50')).toBeInTheDocument();
  });
});
