import { useState } from 'react';
import './App.css';

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

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedBook(event.target.value);
  };

  const submit = (event: React.FormEvent): void => {
    event.preventDefault();
    handleSearch(query);
    handleBookChange(selectedBook);
  };

  const newTestamentBooks = {
    mat: 'Matthew',
    mar: 'Mark',
    luk: 'Luke',
    joh: 'John',
    act: 'Acts of the Holy Apostles',
    rom: 'Romans',
    '1co': '1 Corinthians',
    '2co': '2 Corinthians',
    gal: 'Galatians',
    eph: 'Ephesians',
    phi: 'Philippians',
    col: 'Colossians',
    '1th': '1 Thessalonians',
    '2th': '2 Thessalonians',
    '1ti': '1 Timothy',
    '2ti': '2 Timothy',
    tit: 'Titus',
    plm: 'Philemon',
    heb: 'Hebrews',
    jam: 'James',
    '1pe': '1 Peter',
    '2pe': '2 Peter',
    '1jo': '1 John',
    '2jo': '2 John',
    '3jo': '3 John',
    jde: 'Jude',
    apo: 'Apocalypsis',
  } as const;  

  return (
    <form onSubmit={submit}>
      <input
        type="text"
        placeholder="Enter search query"
        value={query}
        onChange={handleInputChange}
      />
      <select value={selectedBook} onChange={handleDropdownChange}>
        <option value=''>Select a Book</option>
        {Object.entries(newTestamentBooks).map(([key, name]) => (
          <option key={key} value={key}>
            {name}
          </option>
        ))}
      </select>
      <button type="submit">Search</button>
    </form>
  );
};
