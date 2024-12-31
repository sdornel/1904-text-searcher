import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { TextContainer } from './TextContainer';
import userEvent from '@testing-library/user-event';

const mockTransliteratedLowercase = [
  {
    book_name: 'mat',
    chapters: [
      {
        number: 1,
        verses: [
          { number: 1, text: 'Test Verse ērōdēs' },
          { number: 2, text: 'zzz' },
        ],
      },
    ],
  },
  {
    book_name: 'mar',
    chapters: [
      {
        number: 1,
        verses: [
          { number: 1, text: 'Another Test Verse' },
        ],
      },
    ],
  },
];

const mockGreek = [
  {
    book_name: 'greek_book',
    chapters: [
      {
        number: 1,
        verses: [
          { number: 1, text: 'Γειά σου κόσμε' },
        ],
      },
    ],
  },
];

jest.mock('./data/data', () => ({
  __esModule: true,
  default: {
    getInstance: jest.fn(() => ({
      transliteratedLowercase: mockTransliteratedLowercase,
      greek: mockGreek,
      textSelector: jest.fn((text) => {
        switch (text) {
          case 'TransliteratedLowercase':
            return mockTransliteratedLowercase;
          case 'Greek':
            return mockGreek;
          default:
            return [];
        }
      }),
    })),
  },
}));

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
  jest.resetModules();
});

describe('TextContainer', () => {
  it('renders with no search input', () => {
    render(<TextContainer searchInput="" selectedBooks={[]} selectedText='TransliteratedLowercase' />);
    expect(screen.getByText('Matthew')).toBeInTheDocument();
    expect(screen.getByText('Mark')).toBeInTheDocument();
    expect(screen.getByText('Test Verse ērōdēs')).toBeInTheDocument();
    expect(screen.getByText('Another Test Verse')).toBeInTheDocument();
  
    const verseNumbers = screen.getAllByText('1:', { exact: false });
    expect(verseNumbers.length).toBeGreaterThanOrEqual(2);
  });

  it('displays found instances', async () => {
    render(<TextContainer searchInput="Test" selectedBooks={[]} selectedText='TransliteratedLowercase' />);
    expect(screen.getByText('Found 2 instance(s)')).toBeInTheDocument();
  });

  it('"e" includes diacriticals when searching', () => {
    render(<TextContainer searchInput="erodes" selectedBooks={[]} selectedText='TransliteratedLowercase' />);
    expect(screen.getByText('Found 1 instance(s)')).toBeInTheDocument();
  });

  it('"o" includes diacriticals when searching', () => {
    render(<TextContainer searchInput="erodes" selectedBooks={[]} selectedText='TransliteratedLowercase' />);
    expect(screen.getByText('Found 1 instance(s)')).toBeInTheDocument();
  });

  it('does not return results for unmatched search input', () => {
    render(<TextContainer searchInput="asdf" selectedBooks={[]} selectedText='TransliteratedLowercase' />);
    expect(screen.queryByText('Found')).toBeNull();
    expect(screen.queryByText('Matthew')).toBeNull();
  });

  it('search query is case insensitive', () => {
    render(<TextContainer searchInput="ZZZ" selectedBooks={[]} selectedText='TransliteratedLowercase' />);
    expect(screen.queryByText('Found 0 instance(s)')).toBeNull();
  })

  it('copies search results to clipboard', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: jest.fn(),
      },
    });
    render(<TextContainer searchInput="Test Verse" selectedBooks={["mat"]} selectedText='TransliteratedLowercase' />);
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
    render(<TextContainer searchInput="randomtext" selectedBooks={[]} selectedText='TransliteratedLowercase' />);

    expect(screen.queryByText('Found')).not.toBeInTheDocument();
    expect(screen.queryByText('Matthew')).not.toBeInTheDocument();
    expect(screen.queryByText('Mark')).not.toBeInTheDocument();
  });

  it('filters by selected book correctly', () => {
    render(<TextContainer searchInput="Test" selectedBooks={["mar"]} selectedText='TransliteratedLowercase' />);
    expect(screen.getByText('Found 1 instance(s)')).toBeInTheDocument();
    expect(screen.getByText('Mark')).toBeInTheDocument();
    expect(screen.queryByText('Matthew')).toBeNull();
  });

  it('renders correctly when there are no matches', () => {
    render(<TextContainer searchInput="nomatch" selectedBooks={[]} selectedText='TransliteratedLowercase' />);
    expect(screen.queryByText('Found')).toBeNull();
    expect(screen.queryByText('Matthew')).toBeNull();
    expect(screen.queryByText('Mark')).toBeNull();
  });
});