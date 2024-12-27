import { useState } from 'react';

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

  const reset = (): void => {
    handleSearch('');
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