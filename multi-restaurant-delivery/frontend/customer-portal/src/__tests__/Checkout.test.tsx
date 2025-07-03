import { render, screen } from '@testing-library/react';
import * as featureFlags from '../featureFlags';
import { Checkout } from '../components/Checkout';

jest.mock('../featureFlags');

const mockUseFlags = featureFlags.useFlags as jest.Mock;

describe('Checkout A/B-Experiment', () => {
  it('rendert NewCheckout bei Flag', () => {
    mockUseFlags.mockReturnValue({ data: { newCheckoutFlow: true } });
    render(<Checkout />);
    expect(screen.getByText(/NewCheckout/)).toBeInTheDocument();
  });
  it('rendert LegacyCheckout bei Flag=false', () => {
    mockUseFlags.mockReturnValue({ data: { newCheckoutFlow: false } });
    render(<Checkout />);
    expect(screen.getByText(/LegacyCheckout/)).toBeInTheDocument();
  });
});
