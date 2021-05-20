export interface Book {
  id: number;
  title: string;
}

export const getBooks = async () => await fetch("https://jsonplaceholder.typicode.com/photos");

export const getBook = async (bookId: number) => await fetch(`https://jsonplaceholder.typicode.com/photos/${bookId}`);
