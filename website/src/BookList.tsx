import './App.css';
import { NewTestamentBooks } from './data/books';
import { displayEntireBookName } from './helpers/helpers';

interface BookListProps {
  onBookSelect: (book: keyof typeof NewTestamentBooks) => void;
  selectedBooks: Array<string>;
}

export const BookList = ({ onBookSelect, selectedBooks }: BookListProps) => {
  const books = Object.keys(NewTestamentBooks) as Array<keyof typeof NewTestamentBooks>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Select book(s)</h2>
      <ul className="space-y-1">
        {books.map((key) => (
          <li 
            key={key} 
            onClick={() => onBookSelect(key)} 
            className={`hover:text-blue-500 cursor-pointer p-1 ${
              selectedBooks.includes(key) ? 'bg-blue-100 font-bold' : ''
            }`}
          >
            {displayEntireBookName(key)}
          </li>
        ))}
      </ul>
    </div>
  );
}
