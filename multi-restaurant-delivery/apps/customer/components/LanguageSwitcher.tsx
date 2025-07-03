import React from 'react';
import { useRouter } from 'next/router';
import i18n from '../../../packages/ui/src/i18n';

const languages = [
  { code: 'de', label: 'Deutsch' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
];

export const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const currentLang = i18n.language || 'de';

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    router.replace(router.asPath, undefined, { locale: lng });
  };

  return (
    <select
      aria-label="Sprache wählen"
      value={currentLang}
      onChange={e => changeLanguage(e.target.value)}
      className="ml-2 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
    >
      {languages.map(l => (
        <option key={l.code} value={l.code}>{l.label}</option>
      ))}
    </select>
  );
};
