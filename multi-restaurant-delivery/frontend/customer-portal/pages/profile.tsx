import { LoyaltyBalance } from '@/components/LoyaltyBalance';
import { useUser } from '@/hooks/useUser';

export default function ProfilePage() {
  const { user } = useUser();
  return (
    <div>
      <h1>Willkommen, {user.name}</h1>
      <LoyaltyBalance userId={user.id} />
    </div>
  );
}
