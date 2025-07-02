import { useQuery, gql } from '@apollo/client';
export const BADGES_QUERY = gql`
  query Badges($userId: ID!) {
    badges(userId: $userId)
  }
`;
export const POINTS_QUERY = gql`
  query Points($userId: ID!) {
    points(userId: $userId)
  }
`;
export default function ProfileGamification({ userId }: { userId: string }) {
  const { data: badgeData } = useQuery(BADGES_QUERY, { variables: { userId } });
  const { data: pointsData } = useQuery(POINTS_QUERY, { variables: { userId } });
  return (
    <div>
      <h3>Badges</h3>
      <ul>{badgeData?.badges.map((b: string) => <li key={b}>{b}</li>)}</ul>
      <h3>Punkte</h3>
      <div>{pointsData?.points}</div>
    </div>
  );
}
