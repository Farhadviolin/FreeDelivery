import { useQuery, gql } from '@apollo/client';
export const FEED_QUERY = gql`
  query Feed($userId: ID!, $limit: Int!) {
    feed(userId: $userId, limit: $limit) {
      id content imageUrl createdAt
    }
  }
`;
export default function FeedPage() {
  const { data } = useQuery(FEED_QUERY, { variables:{ userId:'u1', limit:20 } });
  return (
    <div>
      {data?.feed.map(post=>(
        <div key={post.id}>
          <p>{post.content}</p>
          {post.imageUrl && <img src={post.imageUrl} />}
        </div>
      ))}
    </div>
  );
}
