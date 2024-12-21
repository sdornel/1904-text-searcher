import { useState } from 'react';
import './App.css'
import { Search } from './Search.tsx';
import { TextContainer } from './TextContainer.tsx';

function App() {
  console.log('renderApp');
  const [searchInput, setSearchInput] = useState('');
  const [selectedBook, setSelectedBook] = useState('');

  const handleSearch = (input: string): void => {
    setSearchInput(input);
  };

  const handleBookChange = (book: string): void => {
    setSelectedBook(book);
  };

  return (
    <>
      <Search handleSearch={handleSearch} handleBookChange={handleBookChange}/>
      <p>Search Query: {searchInput}</p>
      <TextContainer searchInput={searchInput} selectedBook={selectedBook} />
    </>
  )
}

export default App
