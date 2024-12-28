import { useState } from 'react';

type SearchProps = {
  handleSearch: (query: string) => void;
  handleTextChange: (text: string) => void;
};

export const Search = ({ handleSearch, handleTextChange }: SearchProps) => {
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
    <form onSubmit={submit} className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Enter search query"
          value={query}
          onChange={handleInputChange}
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex items-center gap-2">
          <select
            id="text-selector"
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleTextChange(event.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="TransliteratedLowercase">Transliterated Lowercase</option>
            <option value="GreekAndLowercaseTransliteration">Greek and Lowercase Transliteration</option>
            <option value="Greek">Greek</option>
          </select>
        </div>
      </div>

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