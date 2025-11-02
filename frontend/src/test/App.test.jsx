import { render, screen } from '@testing-library/react';
import App from '../../App';

describe('App basic render', () => {
  it('renders header or button text', () => {
    render(<App />);
    // adjust these expectations to match your App component structure
    const maybeElement = screen.queryByText(/recipes/i) || screen.queryByRole('heading') || screen.queryByRole('button');
    expect(maybeElement).toBeTruthy();
  });
});
