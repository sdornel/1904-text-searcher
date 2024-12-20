import { useEffect, useState } from 'react'
import './App.css'
import Data, { Book, Chapter, TransliteratedData, Verse } from './data/data';

type TextContainerProps = {
  searchInput: string;
}
export const TextContainer = ({ searchInput }: TextContainerProps) => {
  const [filteredData, setFilteredData] = useState(Data.getInstance().transliteratedLowercase);

  // TODO:
  // add filter by book
  // case statement to display entire book name instead of just 3 characters
  // make macron optional in search
  useEffect((): void => {
    const allBooks: TransliteratedData = Data.getInstance().transliteratedLowercase;

    const filtered = allBooks.map((book) => ({
      ...book,
      chapters: book.chapters
        .map((chapter) => ({
          ...chapter,
          verses: chapter.verses.filter((verse) =>
            verse.text.toLowerCase().includes(searchInput.toLowerCase())
          ),
        }))
        .filter((chapter) => chapter.verses.length > 0),
    })).filter((book) => book.chapters.length > 0);

    setFilteredData(filtered);
  }, [searchInput]);

  return (
    <div>
      {filteredData.map((book: Book, bookIndex: number) => (
        <div key={bookIndex}>
          <h2>{book.book_name}</h2>
          {book.chapters.map((chapter: Chapter, chapterIndex: number) => (
            <div key={chapterIndex}>
              <h3>{chapter.number}</h3>
              {chapter.verses.map((verse: Verse, verseIndex: number) => (
                <p key={verseIndex}>
                  <span>{verse.number}:</span> {verse.text}
                </p>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
