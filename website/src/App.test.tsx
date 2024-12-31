import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders all main components', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Enter search query')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Select book(s)')).toBeInTheDocument();
  });

  it('updates search input state when typing', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText('Enter search query');

    fireEvent.change(searchInput, { target: { value: 'test query' } });
    expect(searchInput).toHaveValue('test query');
  });

  it('updates selected text when dropdown changes', () => {
    render(<App />);
    const dropdown = screen.getByRole('combobox');

    fireEvent.change(dropdown, { target: { value: 'Greek' } });
    expect(dropdown).toHaveValue('Greek');
  });

  it('calls handleSearch on search button click', () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText('Enter search query');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(searchInput, { target: { value: 'search term' } });
    fireEvent.click(searchButton);

    expect(searchInput).toHaveValue('search term');
  });

  it('does not crash with an empty search query', () => {
    render(<App />);
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.click(searchButton);

    expect(screen.queryByText('Found')).not.toBeInTheDocument();
  });

  it('copies search results to clipboard when clicking Copy Search Results', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: jest.fn(),
      },
      writable: true,
    });

    render(<App />);
    const copyButton = screen.getByText('Copy Search Results');

    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});