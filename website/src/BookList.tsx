import './App.css';
import { NewTestamentBooks } from './data/books';

interface BookListProps {
  onBookSelect: (book: keyof typeof NewTestamentBooks) => void;
  selectedBooks: Array<string>; // Array of selected books
}

function BookList({ onBookSelect, selectedBooks }: BookListProps) {
  console.log('renderBookList');

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
            {NewTestamentBooks[key]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;