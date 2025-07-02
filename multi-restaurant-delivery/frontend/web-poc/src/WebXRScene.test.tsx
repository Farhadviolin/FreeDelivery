import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { WebXRScene } from './WebXRScene';

jest.mock('@react-three/drei', () => ({
  useGLTF: () => ({ scene: {} }),
}));

describe('WebXRScene', () => {
  it('renders without crashing', () => {
    render(<WebXRScene />);
    expect(screen.getByText(/Virtuelles Restaurant-Erlebnis/i)).toBeInTheDocument();
  });
});
