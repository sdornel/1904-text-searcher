import { useEffect, useState } from 'react'
import './App.css'
import Data, { Book, Chapter, TransliteratedData, Verse } from './data/data';
import { NewTestamentBooks } from './data/books';
import parse from 'html-react-parser';

type TextContainerProps = {
  searchInput: string;
  selectedBook: string;
}
export const TextContainer = ({ searchInput, selectedBook }: TextContainerProps) => {
  console.log('renderText');
  const [filteredData, setFilteredData] = useState(Data.getInstance().transliteratedLowercase);
  const [instances, setInstances] = useState<number>(0);
  // TODO:
  // create options box with all the books
  // add way to filter book by selecting from options box
  // ^ need to be able to select multiple books at once

  // Finish writing test cases for this file. Mostly done but a few edge cases not covered

  // later TODO
  // have regex search that can find "ego" + random text + "eimi" (difficult to do, potential security vulnerability)
  // ^ maybe multi word search with dynamic number of search fields
  useEffect((): void => {
    const allBooks: TransliteratedData = Data.getInstance().transliteratedLowercase;
    let foundInstances = 0;

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

            if (normalizedVerseText.includes(normalizedSearchInput) && normalizedSearchInput.length > 0) {
              foundInstances++;
            }
              return normalizedVerseText.includes(normalizedSearchInput);
          }),
        })).filter((chapter) => chapter.verses.length > 0),
    })).filter((book) => book.chapters.length > 0);
    setFilteredData(filtered);
    setInstances(foundInstances);
  }, [searchInput, selectedBook]);

  // Documentation for text normalization https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
  const normalizeText = (text: string): string => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  const displayEntireBookName = (key: keyof typeof NewTestamentBooks) => {
    return NewTestamentBooks[key];
  }

  const copyToClipboard = async () => {
    const textToCopy = filteredData
      .map((book) => {
        const bookHeader = `Book: ${displayEntireBookName(book.book_name as keyof typeof NewTestamentBooks)}`;
        const chapters = book.chapters
          .map((chapter) => {
            const chapterHeader = `  Chapter ${chapter.number}`;
            const verses = chapter.verses
              .map((verse) => `    ${verse.number}: ${verse.text}`)
              .join('\n');
            return `${chapterHeader}\n${verses}`;
          })
          .join('\n');
        return `${bookHeader}\n${chapters}`;
      })
      .join('\n\n');

    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
      console.error('Failed to copy search results: ', err);
      alert('Error! Failed to copy search results.');
    }
  }

  const highlightText = (text: string, query: string): string => {
    if (!query) {
      return text;
    }
  
    const normalizedQuery = query.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const normalizedText = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
    // Check if the normalized query exists in normalized text
    const regex = new RegExp(normalizedQuery, 'gi');
    let match;
    let result = '';
    let lastIndex = 0;
  
    // Match normalized text but replace in the original text
    while ((match = regex.exec(normalizedText)) !== null) {
      const startIndex = match.index;
      const endIndex = startIndex + match[0].length;
  
      // Map indices back to the original text
      result += text.slice(lastIndex, startIndex); // Add text before the match
      result += `<span style="color: red; font-weight: bold;">${text.slice(startIndex, endIndex)}</span>`; // Highlight match
      lastIndex = endIndex;
    }
  
    // Add any remaining text after the last match
    result += text.slice(lastIndex);
  
    return result;
  };

  return (
    <div>
      {instances > 0 ? <span>Found {instances} instance(s)</span> : null}
      <br/>
      <button onClick={copyToClipboard} style={{ margin: '10px 0' }}>
        Copy Search Results
      </button>
      {filteredData.map((book: Book, bookIndex: number) => (
        <div key={bookIndex}>
          <h2>{displayEntireBookName(book.book_name as keyof typeof NewTestamentBooks)}</h2>
          {book.chapters.map((chapter: Chapter, chapterIndex: number) => (
            <div key={chapterIndex}>
              <h3>{chapter.number}</h3>
              {chapter.verses.map((verse: Verse, verseIndex: number) => (
                <p key={verseIndex}>
                  <span>{verse.number}: </span>
                  {parse(highlightText(verse.text, searchInput))}
                </p>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
