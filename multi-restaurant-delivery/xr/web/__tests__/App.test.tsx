import { render } from '@testing-library/react';
import App from '../App';
test('renders Canvas and DishModel', () => {
  const { container } = render(<App />);
  expect(container.querySelector('canvas')).toBeTruthy();
});
