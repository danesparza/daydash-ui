import { render, screen } from '@testing-library/react';
import DashboardHome from './DashboardHome';

test('renders page, including navigation bar', () => {
  render(<DashboardHome />);
  const linkElement = screen.getByText(/Daydash/i);
  expect(linkElement).toBeInTheDocument();
});
