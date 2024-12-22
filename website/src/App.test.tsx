import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./Search', () => ({
  Search: () => <div data-testid="Search" />
}));

jest.mock('./TextContainer', () => ({
  TextContainer: () => <div data-testid="TextContainer" />
}));

describe('App Component', () => {
  it('renders Search and TextContainer components', () => {
    render(<App />);
    
    expect(screen.getByTestId('Search')).toBeInTheDocument();
    expect(screen.getByTestId('TextContainer')).toBeInTheDocument();
  });
});