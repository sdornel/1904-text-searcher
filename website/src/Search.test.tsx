import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Search } from './Search';

describe('Search Component', () => {
  const mockHandleSearch = jest.fn();
  const mockHandleTextChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders input, dropdown, and buttons correctly', () => {
    render(<Search handleSearch={mockHandleSearch} handleTextChange={mockHandleTextChange} />);
    
    expect(screen.getByPlaceholderText('Enter search query')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
  });

  it('updates the search query state when typing in the input field', () => {
    render(<Search handleSearch={mockHandleSearch} handleTextChange={mockHandleTextChange} />);
    const input = screen.getByPlaceholderText('Enter search query');

    fireEvent.change(input, { target: { value: 'test query' } });
    expect(input).toHaveValue('test query');
  });

  it('calls handleSearch with query on form submit', () => {
    render(<Search handleSearch={mockHandleSearch} handleTextChange={mockHandleTextChange} />);
    const input = screen.getByPlaceholderText('Enter search query');
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.click(searchButton);

    expect(mockHandleSearch).toHaveBeenCalledWith('test query');
  });

  it('calls handleSearch with empty string on reset', () => {
    render(<Search handleSearch={mockHandleSearch} handleTextChange={mockHandleTextChange} />);
    const resetButton = screen.getByRole('button', { name: 'Reset' });

    fireEvent.click(resetButton);

    expect(mockHandleSearch).toHaveBeenCalledWith('');
  });

  it('calls handleTextChange when dropdown value changes', () => {
    render(<Search handleSearch={mockHandleSearch} handleTextChange={mockHandleTextChange} />);
    const dropdown = screen.getByRole('combobox');

    fireEvent.change(dropdown, { target: { value: 'Greek' } });
    expect(mockHandleTextChange).toHaveBeenCalledWith('Greek');
  });

  it('submits the form when Enter is pressed in the input field', () => {
    render(<Search handleSearch={mockHandleSearch} handleTextChange={mockHandleTextChange} />);
    const input = screen.getByPlaceholderText('Enter search query');
    const form = input.closest('form') as HTMLFormElement;
  
    fireEvent.change(input, { target: { value: 'enter key query' } });
    fireEvent.submit(form);
  
    expect(mockHandleSearch).toHaveBeenCalledWith('enter key query');
  });

  it('dropdown selection does not reset the search query', () => {
    render(<Search handleSearch={mockHandleSearch} handleTextChange={mockHandleTextChange} />);
    const input = screen.getByPlaceholderText('Enter search query');
    const dropdown = screen.getByRole('combobox');

    fireEvent.change(input, { target: { value: 'query remains' } });
    fireEvent.change(dropdown, { target: { value: 'GreekAndLowercaseTransliteration' } });

    expect(input).toHaveValue('query remains');
  });

  it('does not call handleSearch if input is empty', () => {
    render(<Search handleSearch={mockHandleSearch} handleTextChange={mockHandleTextChange} />);
    const searchButton = screen.getByRole('button', { name: 'Search' });

    fireEvent.click(searchButton);
    expect(mockHandleSearch).toHaveBeenCalledWith('');
  });
});