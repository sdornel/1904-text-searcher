import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from './Search';
import userEvent from '@testing-library/user-event';

describe('Search Component', () => {
  const mockHandleSearch = jest.fn();
  const mockHandleBookChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input, dropdown, and button elements', () => {
    render(<Search handleSearch={mockHandleSearch} handleBookChange={mockHandleBookChange} />);
    
    expect(screen.getByPlaceholderText('Enter search query')).toBeInTheDocument();
    expect(screen.getByText('Select a Book')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  it('updates search query state when typing in the input field', () => {
    render(<Search handleSearch={mockHandleSearch} handleBookChange={mockHandleBookChange} />);
    
    const input = screen.getByPlaceholderText('Enter search query') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test query' } });
    
    expect(input.value).toBe('test query');
  });

  it('updates selected book when changing the dropdown', async () => {
    render(<Search handleSearch={mockHandleSearch} handleBookChange={mockHandleBookChange} />);
    
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    
    await userEvent.selectOptions(select, 'mat');
    
    expect(select.value).toBe('mat');
  });
  

  it('calls handleSearch and handleBookChange on form submit', () => {
    render(<Search handleSearch={mockHandleSearch} handleBookChange={mockHandleBookChange} />);
    
    const input = screen.getByPlaceholderText('Enter search query');
    const select = screen.getByRole('combobox');
    const button = screen.getByRole('button', { name: /Search/i });
    
    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.change(select, { target: { value: 'mar' } });
    fireEvent.click(button);
    
    expect(mockHandleSearch).toHaveBeenCalledWith('test query');
    expect(mockHandleBookChange).toHaveBeenCalledWith('mar');
  });

  it('resets search query and book selection on reset', () => {
    render(<Search handleSearch={mockHandleSearch} handleBookChange={mockHandleBookChange} />);
    
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);
    
    expect(mockHandleSearch).toHaveBeenCalledWith('');
    expect(mockHandleBookChange).toHaveBeenCalledWith('');
  });

  it('triggers submit when pressing Enter on the dropdown', async () => {
    render(<Search handleSearch={mockHandleSearch} handleBookChange={mockHandleBookChange} />);
    
    const input = screen.getByPlaceholderText('Enter search query');
    const select = screen.getByRole('combobox');
    
    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.change(select, { target: { value: 'luk' } });
    fireEvent.keyDown(select, { key: 'Enter' });
    
    expect(mockHandleSearch).toHaveBeenCalledWith('test query');
    expect(mockHandleBookChange).toHaveBeenCalledWith('luk');
  });
});