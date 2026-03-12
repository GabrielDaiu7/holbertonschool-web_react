import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the h1 element with text School Dashboard', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /school dashboard/i });
  expect(heading).toBeInTheDocument();
});

test('renders the correct text in the body and footer paragraphs', () => {
  render(<App />);
  const bodyText = screen.getByText(/login to access the full dashboard/i);
  expect(bodyText).toBeInTheDocument();

  const footerText = screen.getByText(/copyright \d{4} - holberton school/i);
  expect(footerText).toBeInTheDocument();
});

test('renders an img element with the holberton logo', () => {
  render(<App />);
  const logo = screen.getByAltText(/holberton logo/i);
  expect(logo).toBeInTheDocument();
});