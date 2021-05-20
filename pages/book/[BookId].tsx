import { GetStaticPaths, GetStaticProps } from "next";
import { Book, getBook, getBooks } from "../../api/books";
import useSWR from 'swr';
import { useRouter } from 'next/router';

const fetcher = url => fetch(url).then(r => r.json())

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
  console.log(context.params.BookId);
  const book = await (await getBook(parseInt(context.params.BookId as string, 10))).json() as Book;
  return {
    props: { book }
  }
}

export default function BookPage({book: initialBook}: Props) {
  const { query } = useRouter();

  const { data: book } = useSWR<Book>(`https://jsonplaceholder.typicode.com/photos/${query.BookId}`, fetcher, { initialData: initialBook });

  return (
    <div>
      <div>BOOK!</div>
      <div>{book.title}</div>
    </div>
  )
}
