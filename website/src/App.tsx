import { useState } from 'react';
import './App.css';
import { Search } from './Search.tsx';
import { TextContainer } from './TextContainer.tsx';
import BookList from './BookList.tsx';
import './index.css';

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
    <div className="h-screen flex gap-4 p-4">
      <div className="flex-1">
        <Search handleSearch={handleSearch} handleBookChange={handleBookChange} />
        <TextContainer searchInput={searchInput} selectedBook={selectedBook} />
      </div>
      <div className="w-1/4 border-l border-gray-300 p-4 overflow-y-auto bg-gray-50">
        <BookList />
      </div>
    </div>
  )
}

export default App
