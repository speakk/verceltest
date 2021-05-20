import { useEffect, useState } from "react";
import { Book } from "../api/books";
import useSWR from 'swr';
import { GetStaticProps } from "next";
import Link from "next/link";
import { fetcher } from "../api/fetcher";

interface Props {
  books: Book[]
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const books = await (await fetch('https://jsonplaceholder.typicode.com/photos')).json();
  return {
    props: {
      books
    }
  }
}


export default function Index({ books: initialBooks}: Props) {
  const { data: books } = useSWR<Book[]>('https://jsonplaceholder.typicode.com/photos', fetcher, { initialData: initialBooks });

  return (
    <div>
    {
      books.map(book => (
      <div key={book.id}>
        <Link href={`/book/${book.id}`}><a>{book.title}</a></Link>
      </div>
      ))
    }
    </div>
  )
}
