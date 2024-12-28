import TransliteratedLowercase from '../../converted-json-files/transliterated_lowercase.json';
import GreekLowercase from '../../converted-json-files/greek_and_transliterated_lowercase.json';
import Greek from '../../converted-json-files/greek.json';

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

  textSelector(text: string): TransliteratedData {
    switch (text) {
      case 'TransliteratedLowercase':
        return this.transliteratedLowercase;
      case 'GreekLowercase':
        return this.greekLowercase;
      case 'Greek':
        return this.greek;
      default:
        throw new Error('Invalid text');
    }
  }

  // getters are overkill at this point
  get transliteratedLowercase(): TransliteratedData {
    return TransliteratedLowercase;
  }

  get greekLowercase(): TransliteratedData {
    return GreekLowercase;
  }

  get greek() : TransliteratedData {
    return Greek;
  }
}