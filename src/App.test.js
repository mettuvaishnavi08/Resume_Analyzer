import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders welcome message', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/welcome to your react app/i);
  expect(welcomeElement).toBeInTheDocument();
});

test('renders app logo', () => {
  render(<App />);
  const logo = screen.getByAltText(/logo/i);
  expect(logo).toBeInTheDocument();
});