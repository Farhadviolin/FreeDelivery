import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { userSegmentState } from '@/state/userState';
import { AdaptiveCard } from '@/components/AdaptiveCard';
import { useUser } from '@/hooks/useUser';
import { useSegment } from '@/services/flags';

export default function Home() {
  const { user } = useUser();
  const setSegment = useSetRecoilState(userSegmentState);
  const segment = useSegment(user.id);
  useEffect(() => { setSegment(segment); }, [segment]);
  return <AdaptiveCard itemId="homepage" />;
}
