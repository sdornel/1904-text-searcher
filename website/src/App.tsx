import { useState } from 'react';
import { Search } from './Search.tsx';
import { TextContainer } from './TextContainer.tsx';
import BookList from './BookList.tsx';
import './index.css';
import { TextSelect } from './TextSelect.tsx';

function App() {
  console.log('renderApp');
  // const [selectedText, setSelectedText] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);

  // const handleTextSelect = (text: string): void => {
  //   setSelectedText(text);
  // };

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
        {/* <TextSelect handleTextSelect={handleTextSelect}/> */}
        <TextSelect />
        <Search handleSearch={handleSearch} />
        <TextContainer searchInput={searchInput} selectedBooks={selectedBooks} />
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
