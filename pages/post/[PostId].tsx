import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '../../api/fetcher';

interface Post {
  id: number;
  title: string;
}

export default function PostPage() {
  const { query } = useRouter();

  const { data: post } = useSWR<Post>(query.PostId ? `https://jsonplaceholder.typicode.com/posts/${query.PostId}` : null, fetcher);

  if (!post) { return null; }

  return (
    <div>
      <div>{post.title}</div>
    </div>
  );
}
