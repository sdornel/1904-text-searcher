import { useState } from 'react';
import './App.css'
import { Search } from './Search.tsx';
import { TextContainer } from './TextContainer.tsx';

function App() {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (input: string): void => {
    setSearchInput(input);
  };

  return (
    <>
      <Search handleSearch={handleSearch} />
      <p>Search Query: {searchInput}</p>
      <TextContainer searchInput={searchInput}/>
    </>
  )
}

export default App
