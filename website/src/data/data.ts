import TransliteratedLowercase from '../../converted-json-files/transliterated_lowercase.json';
import GreekLowercase from '../../converted-json-files/greek_lowercase.json'

// Allow for declaration merging
export interface Verse {
    number: number;
    text: string;
}

export interface Chapter {
    number: number;
    verses: Array<Verse>;
}

export interface Book {
    book_name: string;
    chapters: Array<Chapter>;
}

export type TransliteratedData = Array<Book>;

export default class Data {
    private static instance: Data;
    chosenText: TransliteratedData = TransliteratedLowercase;

    private constructor() {} // Prevent direct instantiation
  
    public static getInstance(): Data {
      if (!Data.instance) {
        Data.instance = new Data();
      }
      return Data.instance;
    }
  
    get transliteratedLowercase(): TransliteratedData {
      return TransliteratedLowercase;
    }

    // get greekLowercase(): TransliteratedData {
    //   return;
    // }

    get greekLowercase() : TransliteratedData {
      return GreekLowercase;
    }
}