import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Search } from './Search';

describe('Search Component', () => {
  it('renders input and button elements', () => {
    render(<Search handleSearch={jest.fn()} />);
    expect(screen.getByPlaceholderText('Enter search query')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
  });

  it('updates search query state when typing in the input field', () => {
    render(<Search handleSearch={jest.fn()} />);
    const input = screen.getByPlaceholderText('Enter search query');
    fireEvent.change(input, { target: { value: 'test query' } });
    expect(input).toHaveValue('test query');
  });

  it('calls handleSearch on form submit', () => {
    const mockHandleSearch = jest.fn();
    render(<Search handleSearch={mockHandleSearch} />);
    const input = screen.getByPlaceholderText('Enter search query');
    const searchButton = screen.getByRole('button', { name: 'Search' });
    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.click(searchButton);
    expect(mockHandleSearch).toHaveBeenCalledWith('test query');
  });

  it('resets search query on reset', () => {
    const mockHandleSearch = jest.fn();
    render(<Search handleSearch={mockHandleSearch} />);
    const resetButton = screen.getByRole('button', { name: 'Reset' });
    fireEvent.click(resetButton);
    expect(mockHandleSearch).toHaveBeenCalledWith('');
  });
});