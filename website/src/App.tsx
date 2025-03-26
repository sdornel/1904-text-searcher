import { useState } from 'react';
import { Search } from './Search.tsx';
import { TextContainer } from './TextContainer.tsx';
import { BookList } from './BookList.tsx';
import './index.css';

function App() {
  console.log('renderApp');
  const [searchInput, setSearchInput] = useState('');
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [selectedText, setSelectedText] = useState('TransliteratedLowercase');

  const handleTextChange = (text: string): void => {
    setSelectedText(text);
  };

  const handleSearch = (input: string): void => {
    setSearchInput(input);
  };

  const handleBookSelect = (book: string): void => {
    setSelectedBooks((prev) => 
      prev.includes(book) ? prev.filter((b) => b !== book) : [...prev, book]
    );
  };

  return (
    <div className="h-screen flex gap-4 p-4">
      <div className="flex-1 flex flex-col border rounded-md shadow-md overflow-hidden">
        <div className="flex items-center gap-4 p-4 border-b bg-gray-50">
          <Search handleSearch={handleSearch} handleTextChange={handleTextChange} />
        </div>
        <TextContainer 
          searchInput={searchInput} 
          selectedBooks={selectedBooks} 
          selectedText={selectedText} 
        />
      </div>

      <div className="w-1/4 flex flex-col border bg-gray-100 rounded-md shadow-md overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4">
          <BookList onBookSelect={handleBookSelect} selectedBooks={selectedBooks} />
        </div>
      </div>
    </div>
  );
}

export default App;

