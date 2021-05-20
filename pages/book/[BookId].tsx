import { GetStaticPaths, GetStaticProps } from "next";
import { Book, getBook, getBooks } from "../../api/books";
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { fetcher } from "../../api/fetcher";

export const getStaticPaths: GetStaticPaths = async () => {
  const books = await (await getBooks()).json() as Book[];
  const paths = [];
  books.forEach(book =>
    paths.push({
      params: {
        BookId: book.id.toString()
      }
    })
  );

  return {
    paths,
    fallback: true
  }
}

interface Props {
  book: Book
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const book = await (await getBook(parseInt(context.params.BookId as string, 10))).json() as Book;
  return {
    props: { book }
  }
}

export default function BookPage({book: initialBook}: Props) {
  const { query } = useRouter();

  const { data: book } = useSWR<Book>(query.BookId ? `https://jsonplaceholder.typicode.com/photos/${query.BookId}` : null, fetcher, { initialData: initialBook });

  if (!book) { return <div /> }

  return (
    <div>
      <div>BOOK!</div>
      <div>{book.title}</div>
    </div>
  )
}
