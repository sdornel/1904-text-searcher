import { useEffect, useState } from 'react'
import './App.css'
import Data, { Book, Chapter, TransliteratedData, Verse } from './data/data';

type TextContainerProps = {
  searchInput: string;
  selectedBook: string;
}
export const TextContainer = ({ searchInput, selectedBook }: TextContainerProps) => {
  console.log('renderText');
  const [filteredData, setFilteredData] = useState(Data.getInstance().transliteratedLowercase);

  // TODO:
  // create options box with all the books
  // add way to filter book by selecting from options box
  // add number of times chosen query was found in the text
  useEffect((): void => {
    const allBooks: TransliteratedData = Data.getInstance().transliteratedLowercase;

    // Hashmap would be faster but there are only 27 entries
    const filtered = allBooks
    .filter((book) => {
      if (selectedBook && book.book_name !== selectedBook) {
        return false;
      }
      return true;
    })
    .map((book) => ({
      ...book,
      chapters: book.chapters
        .map((chapter) => ({
          ...chapter,
          verses: chapter.verses.filter((verse) => {
            const normalizedVerseText = normalizeText(verse.text.toLowerCase());
            const normalizedSearchInput = normalizeText(searchInput.toLowerCase());
          
            return normalizedVerseText.includes(normalizedSearchInput);
          }),
        })).filter((chapter) => chapter.verses.length > 0),
    })).filter((book) => book.chapters.length > 0);
    setFilteredData(filtered);
  }, [searchInput, selectedBook]);

  // Documentation for text normalization https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
  const normalizeText = (text: string): string => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  const displayEntireBookName = (book: string): string => {
    switch (book) {
      case 'mat': return 'Matthew';
      case 'mar': return 'Mark';
      case 'luk': return 'Luke';
      case 'joh': return 'John';
      case 'act': return 'Acts of the Holy Apostles';
      case 'rom': return 'Romans';
      case '1co': return '1 Corinthians';
      case '2co': return '2 Corinthians';
      case 'gal': return 'Galatians';
      case 'eph': return 'Ephesians';
      case 'phi': return 'Philippians';
      case 'col': return 'Colossians';
      case '1th': return '1 Thessalonians';
      case '2th': return '2 Thessalonians';
      case '1ti': return '1 Timothy';
      case '2ti': return '2 Timothy';
      case 'tit': return 'Titus';
      case 'plm': return 'Philemon';
      case 'heb': return 'Hebrews';
      case 'jam': return 'James';
      case '1pe': return '1 Peter';
      case '2pe': return '2 Peter';
      case '1jo': return '1 John';
      case '2jo': return '2 John';
      case '3jo': return '3 John';
      case 'jde': return 'Jude';
      case 'apo': return 'Apocalypsis';
      default: return 'Error displaying Book name';
    }
  }

  return (
    <div>
      {filteredData.map((book: Book, bookIndex: number) => (
        <div key={bookIndex}>
          <h2>{displayEntireBookName(book.book_name)}</h2>
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
