import { render, screen, waitFor } from '@testing-library/react';
import { TextContainer } from './TextContainer';
import userEvent from '@testing-library/user-event';

jest.mock('./data/data', () => ({
    __esModule: true,
    default: {
      getInstance: jest.fn(() => ({
        transliteratedLowercase: [
          {
            book_name: 'mat',
            chapters: [
              {
                number: 1,
                verses: [
                  { number: 1, text: 'Test Verse ērōdēs' },
                  { number: 2, text: 'zzz'},
                ]
              }
            ]
          }
        ]
      }))
    }
}));

describe('TextContainer', () => {
  it('renders with no search input', () => {
    render(<TextContainer searchInput="" selectedBook="" />);
    expect(screen.getByText('Matthew')).toBeInTheDocument();
    expect(screen.getByText('1:')).toBeInTheDocument();
    expect(screen.getByText('Test Verse ērōdēs')).toBeInTheDocument();
  });

  it('displays found instances', () => {
    render(<TextContainer searchInput="Test" selectedBook="" />);
    expect(screen.getByText('Found 1 instance(s)')).toBeInTheDocument();
  });

  it('"e" includes diacriticals when searching', () => {
    render(<TextContainer searchInput="er" selectedBook="" />);
    expect(screen.getByText('Found 1 instance(s)')).toBeInTheDocument();
  });

  it('"o" includes diacriticals when searching', () => {
    render(<TextContainer searchInput="rod" selectedBook="" />);
    expect(screen.getByText('Found 1 instance(s)')).toBeInTheDocument();
  });

  it('does not retrieve content that is not part of the search', () => {
    render(<TextContainer searchInput="asdf" selectedBook="" />);
    expect(screen.queryByText('Found 0 instance(s)')).toBeNull();
  })

  it('search query is not case sensitive', () => {
    render(<TextContainer searchInput="ZZZ" selectedBook="" />);
    expect(screen.queryByText('Found 0 instance(s)')).toBeNull();
  })

  it('copies search results to clipboard', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: jest.fn(),
      },
    });
    render(<TextContainer searchInput="Test Verse" selectedBook="mat" />);
    await screen.findByText('Matthew');
  
    const copyButton = screen.getByText('Copy Search Results');
    await userEvent.click(copyButton);
  
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        expect.stringContaining('Book: Matthew')
      );
    });
  });

  it('displays no results when searchInput does not match', () => {
    render(<TextContainer searchInput="randomtext" selectedBook="" />);

    expect(screen.queryByText('Found')).not.toBeInTheDocument();
    expect(screen.queryByText('Matthew')).not.toBeInTheDocument();
    expect(screen.queryByText('Mark')).not.toBeInTheDocument();
  });
});