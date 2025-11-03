import { render, screen } from '@testing-library/react';
import App from '../../App.jsx';

describe('App component', () => {
  test('renders app root element', () => {
    render(<App />);
    // adapt if your App contains a header or text
    const el = screen.getByText(/recipes/i) || screen.getByRole('main') || screen.getByText(/recipe/i);
    expect(el).toBeInTheDocument();
  });
});
