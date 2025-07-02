import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { DarkModeToggle } from '../../../packages/ui/src/DarkModeToggle';

export default function Home() {
  const { t } = useTranslation('common');
  return (
    <div>
      <header style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: 24 }}>
        <h1>{t('welcome')}</h1>
        <LanguageSwitcher />
        <DarkModeToggle />
      </header>
      <ul>
        <li>
          <Link href="/login">{t('login')}</Link>
        </li>
        <li>
          <Link href="/register">{t('register')}</Link>
        </li>
        <li>
          <Link href="/logout">{t('logout')}</Link>
        </li>
        <li>
          <Link href="/restaurants">{t('restaurants')}</Link>
        </li>
        <li>
          <Link href="/menu">Speisekarte</Link>
        </li>
        <li>
          <Link href="/cart">{t('cart')}</Link>
        </li>
        <li>
          <Link href="/order">Bestellung aufgeben</Link>
        </li>
        <li>
          <Link href="/orders">{t('orders')}</Link>
        </li>
        <li>
          <Link href="/order-status">Bestellstatus</Link>
        </li>
        <li>
          <Link href="/review">Bewertung abgeben</Link>
        </li>
        <li>
          <Link href="/notification-demo">Notification-Demo</Link>
        </li>
        <li>
          <Link href="/security-info">Security & Privacy</Link>
        </li>
        <li>
          <Link href="/docs">Dokumentation & Hilfe</Link>
        </li>
        <li>
          <Link href="/restaurant-admin">Restaurant-Admin</Link>
        </li>
        <li>
          <Link href="/driver-orders">Fahrer-Aufträge</Link>
        </li>
        <li>
          <Link href="/admin">Admin-Panel</Link>
        </li>
      </ul>
    </div>
  );
}
