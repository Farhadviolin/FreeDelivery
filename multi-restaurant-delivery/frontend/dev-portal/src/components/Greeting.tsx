import { useTranslation } from 'react-i18next';
export default function Greeting() {
  const { t } = useTranslation('common');
  return <h1>{t('welcome_message')}</h1>;
}
