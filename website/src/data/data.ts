import TransliteratedLowercase from '../../../transliterated.lowercase.json';

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

export interface TransliteratedData {
    book: Book;
}

export default class Data {
    private static instance: Data;

    private constructor() {} // Prevent direct instantiation
  
    public static getInstance(): Data {
      if (!Data.instance) {
        Data.instance = new Data();
      }
      return Data.instance;
    }
  
    get transliteratedLowercase() {
      return TransliteratedLowercase;
    }
}