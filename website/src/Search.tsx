import { useState } from 'react';
import './App.css';
import { NewTestamentBooks } from './data/books';

type SearchProps = {
  handleSearch: (query: string) => void;
  handleBookChange: (book: string) => void;
};

export const Search = ({ handleSearch, handleBookChange }: SearchProps) => {
  console.log('renderSearch');
  const [query, setQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement> | React.KeyboardEvent<HTMLSelectElement>): void => {
    if ('key' in event) {
      if (event.key === 'Enter') {
        submit(event);
      }
    } else {
      setSelectedBook(event.target.value);
    }
  };

  const submit = (event: React.FormEvent): void => {
    event.preventDefault();
    handleSearch(query);
    handleBookChange(selectedBook);
  };

  const reset = (): void => {
    handleSearch('');
    handleBookChange('');
  }

  return (
    <>
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Enter search query"
          value={query}
          onChange={handleInputChange}
        />
        <select
          value={selectedBook}
          onChange={handleDropdownChange}
          onKeyDown={handleDropdownChange}
        >
          <option value=''>Select a Book</option>
          {Object.entries(NewTestamentBooks).map(([key, name]) => (
            <option key={key} value={key}>
              {name}
            </option>
          ))}
        </select>
        <button type="submit">Search</button>
      </form>
      <br/>
      <span 
        onClick={reset}
        style={{
          color: 'blue',
          textDecoration: 'underline',
          cursor: 'pointer'
        }}
      >
        Reset
      </span>
    </>
  );
};
