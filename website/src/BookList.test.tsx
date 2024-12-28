import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BookList } from './BookList';
import { NewTestamentBooks } from './data/books';

describe('BookList Component', () => {
  const mockOnBookSelect = jest.fn();
  const selectedBooks = ['mat', 'mar'];

  beforeEach(() => {
    jest.clearAllMocks();
    render(<BookList onBookSelect={mockOnBookSelect} selectedBooks={selectedBooks} />);
  });

  it('renders the list of New Testament books', () => {
    Object.keys(NewTestamentBooks).forEach((key) => {
      expect(screen.getByText(NewTestamentBooks[key as keyof typeof NewTestamentBooks])).toBeInTheDocument();
    });
  });

  it('calls onBookSelect when a book is clicked', () => {
    const book = screen.getByText(NewTestamentBooks['luk']);
    fireEvent.click(book);
    expect(mockOnBookSelect).toHaveBeenCalledWith('luk');
  });

  it('applies selected styles to selected books', () => {
    const selectedBook = screen.getByText(NewTestamentBooks['mat']);
    expect(selectedBook).toHaveClass('bg-blue-100');
    expect(selectedBook).toHaveClass('font-bold');
  });

  it('does not apply selected styles to unselected books', () => {
    const unselectedBook = screen.getByText(NewTestamentBooks['luk']);
    expect(unselectedBook).not.toHaveClass('bg-blue-100');
    expect(unselectedBook).not.toHaveClass('font-bold');
  });
});