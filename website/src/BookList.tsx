import { useState } from 'react';
import './App.css';

function BookList() {
  console.log('renderBookList');
  
  const [books] = useState([
    'Matthew', 'Mark', 'Luke', 'John', 'Acts of the Holy Apostles', 'Romans', '1 Corinthians', '2 Corinthians',
    'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians',
    '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter',
    '1 John', '2 John', '3 John', 'Jude', 'Apocalypsis'
  ]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">New Testament Books</h2>
      <ul className="space-y-1">
        {books.map((book, index) => (
          <li key={index} className="hover:text-blue-500 cursor-pointer">
            {book}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;