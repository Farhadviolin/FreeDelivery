import { render, screen } from '@testing-library/react';
import { AdaptiveCard } from './AdaptiveCard';
import * as flags from '../services/flags';

jest.mock('swr', () => () => ({ data: { recommendations: [{ id: '1' }, { id: '2' }] } }));

function CardMock(props: any) { return <div data-testid="card">{props.id}</div>; }

jest.mock('./Card', () => ({ Card: CardMock }));

describe('AdaptiveCard', () => {
  it('renders grid when flag is true', () => {
    jest.spyOn(flags, 'useFlag').mockReturnValue(true);
    render(<AdaptiveCard itemId="test" />);
    expect(screen.getAllByTestId('card').length).toBe(2);
    expect(document.querySelector('.grid')).toBeInTheDocument();
  });
  it('renders list when flag is false', () => {
    jest.spyOn(flags, 'useFlag').mockReturnValue(false);
    render(<AdaptiveCard itemId="test" />);
    expect(screen.getAllByTestId('card').length).toBe(2);
    expect(document.querySelector('.space-y-4')).toBeInTheDocument();
  });
});
