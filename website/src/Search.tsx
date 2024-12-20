import { useState } from 'react';
import './App.css';

type SearchProps = {
  handleSearch: (query: string) => void;
};

export const Search = ({ handleSearch }: SearchProps) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  const submit = (event: React.FormEvent): void => {
    event.preventDefault();
    handleSearch(query);
  };

  return (
    <form onSubmit={submit}>
      <input
        type="text"
        placeholder="Enter search query"
        value={query}
        onChange={handleInputChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};
