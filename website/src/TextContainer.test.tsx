import { render, screen } from '@testing-library/react';
import { TextContainer } from './TextContainer';

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

  it('"e" includes diacriticals', () => {
    render(<TextContainer searchInput="er" selectedBook="" />);
    expect(screen.getByText('Found 1 instance(s)')).toBeInTheDocument();
  });

  it('"o" includes diacriticals', () => {
    render(<TextContainer searchInput="rod" selectedBook="" />);
    expect(screen.getByText('Found 1 instance(s)')).toBeInTheDocument();
  });

  it('does not retrieve content that is not part of the search', () => {
    render(<TextContainer searchInput="asdf" selectedBook="" />);
    expect(screen.queryByText('Found 0 instance(s)')).toBeNull();
  })
});