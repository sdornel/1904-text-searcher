import { useState } from 'react';
import { NewTestamentBooks } from './data/books';

type SearchProps = {
  handleSearch: (query: string) => void;
  handleBookChange: (book: string) => void;
};

export const Search = ({ handleSearch, handleBookChange }: SearchProps) => {
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
  };

  return (
    <form onSubmit={submit} className="p-4 bg-gray-50 border rounded-md shadow-md flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Search the New Testament</h2>
      <input
        type="text"
        placeholder="Enter search query"
        value={query}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={selectedBook}
        onChange={handleDropdownChange}
        onKeyDown={handleDropdownChange}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value=''>Select a Book</option>
        {Object.entries(NewTestamentBooks).map(([key, name]) => (
          <option key={key} value={key}>
            {name}
          </option>
        ))}
      </select>
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Search
        </button>
        <button
          type="button"
          onClick={reset}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
        >
          Reset
        </button>
      </div>
    </form>
  );
};