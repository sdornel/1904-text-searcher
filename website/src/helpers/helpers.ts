import { NewTestamentBooks } from "../data/books";

export const displayEntireBookName = (key: keyof typeof NewTestamentBooks) => {
    return NewTestamentBooks[key];
  }